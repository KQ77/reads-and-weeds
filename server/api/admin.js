const router = require('express').Router();
const { Member, Request, ClubMembers } = require('../db/seed/seed');
const { isAdmin } = require('../middleware');

//POST /api/admin/members
//route for admin to approve requests
//make isAdmin middleware

//get all requests to join a bookclub -  must be admin of club
router.get('/requests', async (req, res, next) => {});

//route for admin to create member of a club (approve a join request)
router.post('/club-members', async (req, res, next) => {
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
