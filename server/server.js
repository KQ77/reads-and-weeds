const express = require('express');
const app = express();
const router = express.Router();
const PORT = process.env.PORT || 1337;
const path = require('path');
const axios = require('axios');
const { syncAndSeed, Member, Review, Book } = require('./db.js');
app.use('/api', router);
//body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static middleware
app.use(express.static(path.join(__dirname, '..', 'public')));

const apiKey = 'AIzaSyCkkHyRp__65PWLfn50WMtKrIncdJwdcBc';

app.get('/members', async (req, res, next) => {
  try {
    const members = await Member.findAll();
    if (members) {
      console.log(members, 'members');
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
    console.log(book);
    if (book) {
      res.status(200).send(book);
    }
  } catch (err) {
    next(err);
  }
});

//any request to homepage of app will serve up the index.html page ?
app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

const init = async () => {
  await syncAndSeed();
  app.listen(PORT, () => console.log(`app listening on port ${PORT}`));
};

init();
