const router = require('express').Router();
const {
  Member,
  Club,
  Image,
  Book,
  Comment,
  Rating,
  ClubMembers,
} = require('../db/seed/seed');
const { isLoggedIn } = require('../middleware');

//s3
const multer = require('multer');
const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

//GET member info
router.get('/:memberId', async (req, res, next) => {
  //should anyone be able to get this info about a member?
  try {
    res.send(
      await Member.findByPk(req.params.memberId, {
        attributes: { exclude: ['password'] },
      })
    );
    // res.send(
    //   await Member.findByPk(req.params.memberId, {
    //     include: [Comment, Rating, Club],
    //   })
    // );
  } catch (err) {
    next(err);
  }
});

//only that member should be able to update the member
router.put('/:memberId', isLoggedIn, async (req, res, next) => {
  try {
    // if a different member is trying to acess this route - make additional middleware for this potentially?
    if (req.member.id !== req.params.memberId * 1) {
      const error = new Error(
        'Not authorized to make these changes. Only the member associated with this account can update the profile information'
      );
      error.status = 401;
      throw error;
    }

    const member = await Member.findByPk(req.params.memberId);
    await member.update(req.body);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});
//make middleware for isSameMember ??

//set storage engine
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

//upload new profile pic
router.post(
  '/:id/update',
  isLoggedIn,
  upload.single('image'),
  async (req, res, next) => {
    try {
      //is member sending request the member to be updated?
      if (req.member.id !== req.params.id * 1) {
        const error = new Error(
          'Not authorized to make these changes. Only the member associated with this account can update the profile information'
        );
        error.status = 401;
        throw error;
      }
      const member = await Member.findByPk(req.params.id);

      //DRY this out later
      console.log(req.body, 'req.body');
      if (req.file) {
        const { file } = req;
        const uploadParams = {
          Bucket: 'bookclub-site-images',
          Key: `${uuidv4()}${file.originalname}`,
          Body: file.buffer,
          ContentType: file.mimetype,
        };
        //upload image to s3 bucket
        s3.upload(uploadParams, function (err, data) {
          if (err) {
            console.log('Error', err);
          }
          if (data) {
            console.log('Upload Success', data.Location);
          }
        });
        //update member imageUrl to new s3 url
        await member.update({
          imageUrl: `https://bookclub-site-images.s3.amazonaws.com/${uploadParams.Key}`,
        });
      }
      await member.update(req.body);
      res.status(204).redirect(`/members/${member.id}`);
    } catch (err) {
      next(err);
    }
  }
);
//GET /api/members/:memberId/clubs
router.get('/:memberId/clubs', isLoggedIn, async (req, res, next) => {
  try {
    const member = await Member.findByPk(req.params.memberId);

    res.send(
      await member.getClubs({
        include: [{ model: Member, attributes: { exclude: ['password'] } }],
      })
    );
  } catch (err) {
    next(err);
  }
});

//route to add member to public club - if club is private, the request should be approved at /api/admin/members
router.post('/:memberId/clubs', isLoggedIn, async (req, res, next) => {
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
      const member = await Member.findByPk(req.params.memberId);
      // await club.addMember(member);
      await ClubMembers.create({ clubId, memberId });
      res.sendStatus(201);
    }
  } catch (err) {
    console.log(err, 'err');
    next(err);
  }
});

module.exports = router;
