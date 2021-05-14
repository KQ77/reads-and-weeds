const router = require('express').Router();
const axios = require('axios');

//  api/books
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
