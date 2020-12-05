const express = require('express');
const app = express();
const router = express.Router();
const PORT = process.env.PORT || 1337;
const path = require('path');
const axios = require('axios');
const { Member, Rating, Comment, Book } = require('../utils/seed.js');
app.use('/api', router);

//body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static middleware
app.use(express.static(path.join(__dirname, '..', 'public')));

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

router.get('/books', async (req, res, next) => {
  const dbBooks = await Book.findAll();
  const apiBooks = await Promise.all(
    dbBooks.map(async (book) => {
      let response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes/${book.apiId}?key=${apiKey}`
      );
      response = response.data;
      response.isCurrent = book.isCurrent;
      return response;
    })
  );
  res.status(200).send(apiBooks);
});

//any request to homepage of app will serve up the index.html page ?
app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

app.listen(PORT, () => console.log(`app listening on port ${PORT}`));
