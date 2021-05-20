const { isLoggedIn } = require('../middleware');
const { Comment, Rating } = require('../db/seed/seed');
const router = require('express').Router();
//body will have bookId, comment text, and rating #
router.post('/:bookId', isLoggedIn, async (req, res, next) => {
  try {
    console.log(req.body, 'req.body');

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
    res.status(201).send();
  } catch (err) {
    next(err);
  }
});

router.put('/:bookId', async (req, res, next) => {
  try {
    console.log(req.body, 'req.body');
    const comment = await Comment.findOne({
      where: { memberId: req.member.id, bookId: req.body.bookId },
    });
    await comment.update(req.body);
    res.status(201).send();
  } catch (err) {
    next(err);
  }
});
module.exports = router;
