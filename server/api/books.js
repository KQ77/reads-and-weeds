const router = require('express').Router();
const axios = require('axios');
const { Book } = require('../db/Models/Book');
const Rating = require('../db/Models/Rating');
const { Comment } = require('../db/Models/Comment');
const { Member } = require('../db/Models/Member');
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
router.get('/:bookId/feedback', async (req, res, next) => {
  try {
    const book = await Book.findByPk(req.params.bookId, {
      include: [
        { model: Comment, include: [Member] },
        { model: Rating, include: [Member] },
      ],
    });
    res.status(200).send(book);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
