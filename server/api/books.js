const router = require('express').Router();
// const Rating = require('../db/Models/Rating');
// const { Comment } = require('../db/Models/Comment');
const { Member, Review, Book } = require('../db/seed/seed');
const { fetchBook } = require('./helpers');

//  api/books
// router.post('/', async (req, res, next) => {
//   try {
//     const { bookId } = req.body;
//     //find all books =
//     const books = await Promise.all(bookId.map((id) => fetchBook(id)));
//     // books.forEach((book, idx) => )
//     res.send(books);
//   } catch (err) {
//     next(err);
//   }
// });

router.get('/:bookId', async (req, res, next) => {
  try {
    const book = await Book.findByPk(req.params.bookId);
    //   include: [{ model: Rating }, { model: Comment, include: [Member] }]

    //fetch book takes a gbId
    const gbook = await fetchBook(book.gbId);
    gbook.bookId = req.params.bookId;
    res.status(200).send(gbook);
  } catch (err) {
    console.log(err.response.data.error.errors, 'err.data');
    next(err);
  }
});
//GET a book's reviews
router.get('/:bookId/reviews', async (req, res, next) => {
  try {
    const reviews = await Review.findAll({
      where: { bookId: req.params.bookId },
      include: [Member],
    });
    res.status(200).send(reviews);
  } catch (err) {
    next(err);
  }
});

//add a book to a club
router.post('/', async (req, res, next) => {
  try {
    const { clubId, isCurrent, gbId } = req.body;

    //if you're adding a current book, check if book has a current book already
    if (isCurrent === true) {
      const club = await Club.findByPk(clubId);
      await club.update({ meetDate: 'TBD' });
      const currentBook = await Book.findOne({
        where: { clubId: clubId, isCurrent: true },
      });
      //if club has a current book, set it to not current
      if (currentBook) {
        await currentBook.update({ isCurrent: false });
      }
    }
    //and make the newly added book the current book
    await Book.create(req.body);
    res.sendStatus(201);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
