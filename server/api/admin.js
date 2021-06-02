const router = require('express').Router();
const {
  Member,
  Request,
  ClubMembers,
  Club,
  Image,
} = require('../db/seed/seed');
const { isAdmin, hasAccess } = require('../middleware');
//s3
const multer = require('multer');
const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

//GET /admin/requests/:clubId
//get all requests to join a bookclub -  must be admin of club
router.get('/clubs/:clubId/requests/', isAdmin, async (req, res, next) => {
  try {
    const requests = await Request.findAll({
      where: { clubId: req.params.clubId },
      include: [Member],
    });
    res.status(200).send(requests);
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

//route for admin to update club info
router.post(
  '/clubs/:clubId',
  isAdmin,
  upload.single('image'),
  async (req, res, next) => {
    try {
      const club = await Club.findByPk(req.params.clubId);
      console.log(req.body, 'req.body');
      if (req.file) {
        const { file } = req;
        const uploadParams = {
          Bucket: 'bookclub-site-images',
          Key: `${uuidv4()}${file.originalname}`,
          Body: file.buffer,
          ContentType: file.mimetype,
        };
        //make entry in image model for this new display image
        await Image.create({
          clubId: req.params.clubId,
          memberId: req.member.id,
          src: `https://bookclub-site-images.s3.amazonaws.com/${uploadParams.Key}`,
        });
        //upload image to s3 bucket
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
      await club.update(req.body);

      res.status(201).redirect(`/bookclubs/${req.params.clubId}`);
      // res.sendStatus(201);
    } catch (err) {
      next(err);
    }
  }
);
//route for admin to create member of a club
router.post('/members/:id/clubs', isAdmin, async (req, res, next) => {
  try {
    const { memberId, clubId, requestId } = req.body;
    //create new member
    await ClubMembers.create({ memberId, clubId });
    //delete join request
    const request = await Request.findByPk(requestId);
    await request.destroy();
    res.sendStatus(201);
  } catch (err) {
    console.log(err, 'err');
    next(err);
  }
});

//delete a request
router.delete(
  `/clubs/:clubId/requests/:id`,
  isAdmin,
  async (req, res, next) => {
    try {
      const request = await Request.findByPk(req.params.id);
      await request.destroy();
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  }
);
module.exports = router;

//what should the api route be to add a member to a club?
//update a club?
//update a member?
