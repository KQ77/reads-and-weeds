const router = require('express').Router();
const { Suggestion, Club } = require('../db/seed/seed');
const { isLoggedIn } = require('../middleware');

// /api/suggestions
router.put('/', isLoggedIn, async (req, res, next) => {
  try {
    const suggestion = await Suggestion.findOne({
      where: {
        clubId: req.body.clubId,
        bookId: req.body.bookId,
        memberId: req.member.id,
      },
    });
    if (suggestion) {
      await suggestion.destroy();
    } else {
      await Suggestion.create({
        clubId: req.body.clubId,
        bookId: req.body.bookId,
        memberId: req.member.id,
      });
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', isLoggedIn, async (req, res, next) => {
  try {
    const { id } = req.params;
    const suggestion = await Suggestion.findByPk(id);
    await suggestion.destroy();
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});
module.exports = router;
