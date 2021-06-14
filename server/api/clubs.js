const router = require('express').Router();

//models
const {
  Club,
  Member,
  Image,
  Book,
  Suggestion,
  Request,
  Review,
  Invite,
  ClubMembers,
} = require('../db/seed/seed');

//s3
const AWS = require('aws-sdk');
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

//set image storage engine
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const { v4: uuidv4 } = require('uuid');

//helpers
const { fetchBook } = require('./helpers');
//middleware
const { hasAccess, isLoggedIn } = require('../middleware');

//sgrid emal sdk
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

//ROUTES//

//GET all clubs
router.get('/', async (req, res, next) => {
  try {
    res.status(200).send(await Club.findAll({ include: [Member, Request] }));
  } catch (err) {
    next(err);
  }
});

//Create a club - once created, redirect to homepage for the new club
router.post('/', isLoggedIn, upload.single('image'), async (req, res, next) => {
  try {
    const club = await Club.create(req.body);
    await ClubMembers.create({ memberId: req.member.id, clubId: club.id });
    if (req.file) {
      const { file } = req;
      const uploadParams = {
        Bucket: 'bookclub-site-images',
        Key: `${uuidv4()}${file.originalname}`,
        Body: file.buffer,
        ContentType: file.mimetype,
      };

      s3.upload(uploadParams, function (err, data) {
        if (err) {
          console.log('Error', err);
        }
        if (data) {
          console.log('Upload Success', data.Location);
        }
      });
      await club.update({
        displayImage: `https://bookclub-site-images.s3.amazonaws.com/${uploadParams.Key}`,
      });
    }
    await club.update({ adminId: req.member.id });

    res.status(201).redirect(`/bookclubs/${club.id}`);
  } catch (err) {
    next(err);
  }
});

//GET bookclub
//if a club is public, send all info; if it's private - if person is member - send all, otherwise send just main club info
router.get('/:id', async (req, res, next) => {
  try {
    const club = await Club.findByPk(req.params.id, {
      include: [
        { model: Member, attributes: { exclude: ['password'] } },
        { model: Image },
        { model: Book, include: [Review] },
        { model: Suggestion, include: [Member] },
        { model: Request },
      ],
    });
    const isMember = (id) => {
      return club.members.find((member) => member.id === id);
    };
    // if no one logged in or person isn't a member
    if (!req.member || !isMember(req.member.id)) {
      res
        .status(200)
        .send(await Club.findByPk(req.params.id, { include: [Member] }));
    } else if (!club.private || isMember(req.member.id)) {
      res.status(200).send(club);
    }
  } catch (err) {
    next(err);
  }
});

//update club -- have to be a member to do this
router.put('/:clubId', hasAccess, async (req, res, next) => {
  try {
    const club = await Club.findByPk(req.params.clubId);
    console.log(req.body, 'req.body');
    await club.update(req.body);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

//GET all of a club's books' google book data
router.get(`/:clubId/books`, hasAccess, async (req, res, next) => {
  //get all books from the club
  let books = await Book.findAll({ where: { clubId: req.params.clubId } });
  if (req.body.past) {
    books = books.filter((book) => book.isCurrent === false);
  }
  const gbooks = await Promise.all(books.map((book) => fetchBook(book.gbId)));
  //add DB book Id to gbook data
  gbooks.forEach((gbook, idx) => {
    gbook.bookId = books[idx].id;
  });
  res.send(gbooks);
});

//GET all of a club's photos
router.get('/:clubId/photos', hasAccess, async (req, res, next) => {
  try {
    const photos = await Image.findAll({
      where: { clubId: req.params.clubId },
    });
    res.send(photos);
  } catch (err) {
    next(err);
  }
});

//POST photos to club
router.post(
  '/:clubId/photos',
  upload.array('photos'),
  hasAccess,
  async (req, res, next) => {
    try {
      for (let i = 0; i < req.files.length; i++) {
        const file = req.files[i];
        const uploadParams = {
          Bucket: 'bookclub-site-images',
          Key: `${uuidv4()}${file.originalname}`,
          Body: file.buffer,
          ContentType: file.mimetype,
        };
        //create entry in DB for each image with src pointing to AWS url
        await Image.create({
          clubId: req.params.clubId,
          memberId: req.member.id,
          src: `https://bookclub-site-images.s3.amazonaws.com/${uploadParams.Key}`,
        });

        s3.upload(uploadParams, function (err, data) {
          if (err) {
            console.log('Error', err);
          }
          if (data) {
            console.log('Upload Success', data.Location);
          }
        });
      }
      res.status(201).redirect(`/bookclubs/${req.params.clubId}/photos`);
    } catch (err) {
      next(err);
    }
  }
);

//GET all of a club's members
router.get('/:clubId/members', hasAccess, async (req, res, next) => {
  try {
    const club = await Club.findByPk(req.params.clubId, { include: [Member] });
    const { members } = club;
    res.status(200).send(members);
  } catch (err) {
    next(err);
  }
});

//ADD a member to a public club
router.post('/:clubId/members', isLoggedIn, async (req, res, next) => {
  try {
    const { clubId, memberId } = req.body;
    const club = Club.findByPk(clubId);
    if (club.private) {
      const error = new Error(
        'Unauthorized. Club is private - must request to join'
      );
      error.status = 401;
      throw error;
    } else {
      // const member = await Member.findByPk(req.params.memberId);
      // await club.addMember(member);
      await ClubMembers.create({ clubId, memberId });
      res.sendStatus(201);
    }
  } catch (err) {
    console.log(err, 'err');
    next(err);
  }
});

//POST an invite to a club (club member can invite another member -- must be a member of the club)
router.post('/:clubId/invites', hasAccess, async (req, res, next) => {
  try {
    const { clubId, email } = req.body;
    const club = await Club.findByPk(clubId);

    //create new invite in DB
    const invite = await Invite.create(req.body);
    //make email
    const msg = {
      to: email, // Change to your recipient
      from: 'qbooks@q-sites.org', // Change to your verified sender
      subject: 'You have an invite :-)',
      content: [
        {
          type: 'text/html',
          value: `You have been invited to join the book club, ${club.name}!<br></br> http://localhost:1337/invites/${invite.id}`,
        },
      ],
    };
    await sgMail.send(msg);
    console.log('Invite sent!!');
    res.sendStatus(201);
  } catch (err) {
    console.log(err.response.body.errors, 'err');
    next(err);
  }
});

//GET all of a club's suggestions ( with google books data for each suggestion)
router.get('/:clubId/suggestions', hasAccess, async (req, res, next) => {
  //get all of club's suggestions from DB
  const suggestions = await Suggestion.findAll({
    where: { clubId: req.params.id },
    include: [Member],
  });
  //for each suggestion, fetch google books data about that book
  const books = await Promise.all(
    suggestions.map((suggestion) => {
      return fetchBook(suggestion.bookId);
    })
  );
  //combine gbooks data with DB suggestions data
  books.forEach((book, idx) => {
    const suggestion = suggestions[idx];
    book.suggestionId = suggestion.id;
    book.member = suggestion.member;
  });
  res.status(200).send(books);
});

//POST A REQUEST
//user must be logged in -- check on front and back? if not -redirect to log in page?
router.post('/:clubId/requests', isLoggedIn, async (req, res, next) => {
  try {
    const { memberId, clubId } = req.body;
    await Request.create({ memberId, clubId });
    res.sendStatus(201);
  } catch (err) {
    next(err);
  }
});

// router.put('/:clubId/suggestions', async (req, res, next) => {
//   console.log(req.member, 'req.member');
//   console.log(req.body, 'req.body');
//   try {
//     const club = await club.findByPk(req.params.clubId);

//   } catch (err) {
//     next(err);
//   }
// });

module.exports = router;
