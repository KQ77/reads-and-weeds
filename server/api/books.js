const router = require('express').Router();
const axios = require('axios');
const { Book } = require('../db/Models/Book');
const Rating = require('../db/Models/Rating');
const { Comment } = require('../db/Models/Comment');
const { Member } = require('../db/Models/Member');
const { fetchBook } = require('./helpers');

//  api/books
//post??
router.post('/gbooks', async (req, res, next) => {
  try {
    const gbIds = req.body.bookIds;
    const fetchBook = async (bookId) => {
      return (
        await axios.get(
          `https://www.googleapis.com/books/v1/volumes/${bookId}?key=${process.env.API_KEY}`
        )
      ).data;
    };
    const books = await Promise.all(gbIds.map((id) => fetchBook(id)));
    res.send(books);
  } catch (err) {
    next(err);
  }
});

router.get('/:bookId', async (req, res, next) => {
  try {
    // const book = await Book.findByPk(req.params.bookId, {
    //   include: [{ model: Rating }, { model: Comment, include: [Member] }],
    // });
    // res.send(await book.getAllData());
    const gbook = await fetchBook(req.params.bookId);
    res.status(200).send(gbook);
  } catch (err) {
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
