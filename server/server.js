const express = require('express');
const app = express();
const PORT = process.env.PORT || 1337;
const path = require('path');
const { syncAndSeed, Member, Review, Book } = require('./db.js');

//body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static middleware
app.use(express.static(path.join(__dirname, '..', 'public')));

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

//any request to homepage of app will serve up the index.html page ?
app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

const init = async () => {
  await syncAndSeed();
  app.listen(PORT, () => console.log(`app listening on port ${PORT}`));
};

init();
