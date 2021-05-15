const router = require('express').Router();
const axios = require('axios');

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

router.get('/gbooks/:bookId', async (req, res, next) => {
  try {
    const gbook = (
      await axios.get(
        `https://www.googleapis.com/books/v1/volumes/${req.params.bookId}?key=${process.env.API_KEY}`
      )
    ).data;
    res.send(gbook);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
