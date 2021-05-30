const router = require('express').Router();
const { Member, Request, ClubMembers } = require('../db/seed/seed');
const { isAdmin, hasAccess } = require('../middleware');

//GET /admin/requests/:clubId
//get all requests to join a bookclub -  must be admin of club
router.get('/requests/:clubId', hasAccess, isAdmin, async (req, res, next) => {
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

//route for admin to create member of a club (approve a join request)
router.post('/club-members', hasAccess, isAdmin, async (req, res, next) => {
  try {
    const { memberId, clubId } = req.body;
    await ClubMembers.create({ memberId, clubId });
    res.sendStatus(201);
  } catch (err) {
    next(err);
  }
});
module.exports = router;

//what should the api route be to add a member to a club?
//update a club?
//update a member?
