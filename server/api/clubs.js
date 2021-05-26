const router = require('express').Router();

//models
const {
  Club,
  Member,
  Image,
  Book,
  Suggestion,
  Comment,
} = require('../db/seed/seed');

//s3
const uuid = require('uuid');
const multer = require('multer');
const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

const { fetchBook } = require('./helpers');
const { hasAccess } = require('../middleware');

router.get('/:clubId', async (req, res, next) => {
  try {
    const club = await Club.findByPk(req.params.clubId, {
      include: [
        { model: Member, attributes: { exclude: ['password'] } },
        { model: Image },
        { model: Book, include: [Comment] },
        { model: Suggestion, include: [Member] },
      ],
    });
    if (!club.private) {
      res.send(club);
    } else {
      //if club is private, check for user and token
      const token = req.cookies.token;
      //if no token throw error saying user must be logged in
      if (!token) {
        const error = new Error(
          'Unauthorized - must be logged in to view this page'
        );
        error.status = 401;
        throw error;
      }
      const member = await Member.findByToken(token);
      //check for this member in club's members
      const isMember = club.members.some((_member) => member.id === _member.id);
      if (isMember) {
        res.send(club);
      } else {
        const error = new Error(
          'Unauthorized. Only members of this club can view this page'
        );
        error.status = 401;
        throw error;
      }
    }
  } catch (err) {
    next(err);
  }
});

//GET all of a club's books' google book data
router.get(`/:clubId/books`, async (req, res, next) => {
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

//set storage engine
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

//POST photos to club
router.post(
  '/:clubId/photos',
  upload.array('photos'),
  hasAccess,
  async (req, res, next) => {
    try {
      for (let i = 0; i < req.files.length; i++) {
        const file = req.files[0];
        const uploadParams = {
          Bucket: 'bookclub-site-images',
          Key: `${uuidv4()}${file.originalname}`,
          Body: file.buffer,
          ContentType: 'image/jpeg',
        };
        s3.upload(uploadParams, function (err, data) {
          if (err) {
            console.log('Error', err);
          }
          if (data) {
            console.log('Upload Success', data.Location);
          }
        });
      }
    } catch (err) {
      next(err);
    }
  }
);
//GET all of a club's suggestions ( with google books data for each suggestion)
router.get('/:clubId/suggestions', async (req, res, next) => {
  //get all of club's suggestions from DB
  const suggestions = await Suggestion.findAll({
    where: { clubId: req.params.clubId },
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
