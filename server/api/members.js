const router = require('express').Router();
const {
  Member,
  Club,
  Book,
  Comment,
  Rating,
  ClubMembers,
} = require('../db/seed/seed');
const { isLoggedIn } = require('../middleware');

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
      console.log(typeof req.member.id, typeof req.params.memberId);
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
      await ClubMembers.create({ clubId, memberId });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
