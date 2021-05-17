const router = require('express').Router();
const { Suggestion, Club } = require('../db/seed/seed');
const { isLoggedIn } = require('../middleware');

router.put('/:clubId', isLoggedIn, async (req, res, next) => {
  try {
    const suggestion = await Suggestion.findOne({
      where: {
        //find the suggestion where the clubId is the clubId and the bookId is the bookId
        //if it exists, delete it - if it doesn't add it
        clubId: req.params.clubId,
        bookId: req.body.bookId,
        memberId: req.member.id,
      },
    });
    if (suggestion) {
      await suggestion.destroy();
    } else {
      await Suggestion.create({
        clubId: req.params.clubId,
        bookId: req.body.bookId,
        memberId: req.member.id,
      });
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

router.delete('/:clubId/:bookId', isLoggedIn, async (req, res, next) => {
  try {
    const { bookId, clubId } = req.params;
    const memberId = req.member.id;
    const suggestion = await Suggestion.findOne({
      where: { bookId, clubId, memberId },
    });
    await suggestion.destroy();
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});
module.exports = router;
