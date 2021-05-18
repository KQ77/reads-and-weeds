const router = require('express').Router();
const { Member, Club, Book, Comment, Rating } = require('../db/seed/seed');
const { isLoggedIn } = require('../middleware');

router.get('/:memberId', async (req, res, next) => {
  //should anyone be able to get this info about a member?
  try {
    res.send(
      await Member.findByPk(req.params.memberId, {
        include: [Comment, Rating, Club],
      })
    );
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

module.exports = router;
