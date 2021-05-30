const router = require('express').Router();
const { Member, Request, ClubMembers } = require('../db/seed/seed');
const { isAdmin, hasAccess } = require('../middleware');

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

//route for admin to create member of a club
router.post('/members/:id/clubs', isAdmin, async (req, res, next) => {
  try {
    const { memberId, clubId, requestId } = req.body;
    console.log(memberId, 'memberId');
    console.log(clubId, 'clubId');

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
