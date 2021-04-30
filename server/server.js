const express = require('express');
const app = express();
const router = express.Router();
// const PORT = process.env.PORT || 1337;
const path = require('path');
const axios = require('axios');
const {
  Member,
  Rating,
  Comment,
  Book,
  Suggestion,
} = require('./db/seed/seed.js');
app.use('/api', router);

//body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static middleware

const PUBLIC_PATH = path.join(__dirname, '../public');
const DIST_PATH = path.join(__dirname, '../dist');
app.use(express.static(PUBLIC_PATH));
app.use(express.static(DIST_PATH));

const apiKey = 'AIzaSyCkkHyRp__65PWLfn50WMtKrIncdJwdcBc';
router.get('/members', async (req, res, next) => {
  try {
    const members = await Member.findAll();
    if (members) {
      res.status(200).send(members);
    }
  } catch (err) {
    next(err);
  }
});

router.get('/members/:memberId', async (req, res, next) => {
  try {
    const member = await Member.findByPk(req.params.memberId);

    res.status(200).send(member);
  } catch (err) {
    next(err);
  }
});

router.get('/books', async (req, res, next) => {
  const books = await Book.findAll({ include: [Comment] });
  console.log(books, 'books');
  // const apiBooks = await Promise.all(
  //   dbBooks.map(async (book) => {
  //     let response = await axios.get(
  //       `https://www.googleapis.com/books/v1/volumes/${book.apiId}?key=${apiKey}`
  //     );
  //     response = response.data;
  //     response.isCurrent = book.isCurrent;
  //     return response;
  //   })
  // );
  res.status(200).send(books);
});
router.get('/volume/:id', async (req, res, next) => {
  try {
    const book = (
      await axios.get(
        `https://www.googleapis.com/books/v1/volumes/${req.params.id}?key=${apiKey}`
      )
    ).data;
    if (book) {
      res.status(200).send(book);
    }
  } catch (err) {
    next(err);
  }
});
router.get('/suggestions', async (req, res, next) => {
  try {
    const suggestions = await Suggestion.findAll();
    res.status(200).send(suggestions);
  } catch (err) {
    next(err);
  }
});

//any request to homepage of app will serve up the index.html page ?
app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

// error handling middleware
app.use((err, req, res, next) => {
  if (process.env.NODE_ENV !== 'test') console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error');
});
// app.listen(PORT, () => console.log(`app listening on port ${PORT}`));

module.exports = app;
