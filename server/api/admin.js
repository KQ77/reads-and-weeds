const router = require('express').Router();
const { Member, Request, ClubMembers } = require('../db/seed/seed');
const { isAdmin, hasAccess } = require('../middleware');

//POST /api/admin/members
//route for admin to approve requests
//make isAdmin middleware

//get all requests to join a bookclub -  must be admin of club
router.get('/requests', hasAccess, isAdmin, async (req, res, next) => {
  try {
    const requests = Request.findAll({ where: { clubId: req.body.clubId } });
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
