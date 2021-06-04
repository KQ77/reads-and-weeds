const { isLoggedIn, hasAccess } = require('../middleware');
const { Comment, Rating } = require('../db/seed/seed');
const router = require('express').Router();

router.get('/:bookId', isLoggedIn, hasAccess, async (req, res, next) => {
  //return feedback associated with this book
  //feedback includes comments and ratings --
});
//body will have bookId, comment text, and rating #
router.post('/:bookId', isLoggedIn, hasAccess, async (req, res, next) => {
  try {
    await Comment.create({
      memberId: req.member.id,
      bookId: req.params.bookId,
      text: req.body.comment,
    });
    await Rating.create({
      rating: req.body.rating,
      bookId: req.params.bookId,
      memberId: req.member.id,
    });
    res.sendStatus(201);
  } catch (err) {
    next(err);
  }
});

//need middleware check
router.put('/:bookId', async (req, res, next) => {
  try {
    const comment = await Comment.findOne({
      where: { memberId: req.member.id, bookId: req.body.bookId },
    });
    await comment.update(req.body);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});
module.exports = router;
