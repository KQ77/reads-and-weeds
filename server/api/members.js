const router = require('express').Router();
const { Member, Club, Book } = require('../db/seed/seed');
const { isLoggedIn } = require('../middleware');

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
