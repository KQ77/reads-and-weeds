const router = require('express').Router();
const { Review, Book } = require('../db/seed/seed');
const { hasAccess } = require('../middleware');

//create a book review
router.post(`/`, hasAccess, async (req, res, next) => {
  try {
    console.log(req.body);
    const { text, rating, bookId } = req.body;
    await Review.create({ text, rating, bookId, memberId: req.member.id });
    res.sendStatus(201);
  } catch (err) {
    next(err);
  }
});

//update a review
router.put(`/:id`, hasAccess, async (req, res, next) => {
  try {
    console.log(req.body);
    const { text, rating, bookId } = req.body;
    const review = await Review.findByPk(req.params.id);
    await review.update({ text, rating, bookId });
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
