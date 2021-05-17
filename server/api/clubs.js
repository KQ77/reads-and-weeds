const { Club, Member, Image, Book, Suggestion } = require('../db/seed/seed');
const axios = require('axios');
const router = require('express').Router();
const { fetchBook } = require('./helpers');

router.get('/:clubId', async (req, res, next) => {
  try {
    const club = await Club.findByPk(req.params.clubId, {
      include: [
        { model: Member, attributes: { exclude: ['password'] } },
        { model: Image },
        { model: Book },
        { model: Suggestion, include: [Member] },
      ],
    });
    if (!club.private) {
      res.send(club);
    } else {
      //if club is private, check for user and token
      const token = req.cookies.token;
      //if no token throw error saying user must be logged in
      if (!token) {
        const error = new Error(
          'Unauthorized - must be logged in to view this page'
        );
        error.status = 401;
        throw error;
      }
      const member = await Member.findByToken(token);
      //check for this member in club's members
      const isMember = club.members.some((_member) => member.id === _member.id);
      if (isMember) {
        res.send(club);
      } else {
        const error = new Error(
          'Unauthorized. Only members of this club can view this page'
        );
        error.status = 401;
        throw error;
      }
    }
  } catch (err) {
    next(err);
  }
});

//GET all of a club's suggestions ( with google books data for each suggestion)
router.get('/:clubId/suggestions', async (req, res, next) => {
  //get all of club's suggestions from DB
  const suggestions = await Suggestion.findAll({
    where: { clubId: req.params.clubId },
    include: [Member],
  });
  //for each suggestion, fetch google books data about that book
  const books = await Promise.all(
    suggestions.map((suggestion) => {
      return fetchBook(suggestion.bookId);
    })
  );
  //combine gbooks data with DB suggestions data
  books.forEach((book, idx) => {
    const suggestion = suggestions[idx];
    book.suggestionId = suggestion.id;
    book.member = suggestion.member;
  });
  console.log(books, 'books');
  res.status(200).send(books);
});
// router.put('/:clubId/suggestions', async (req, res, next) => {
//   console.log(req.member, 'req.member');
//   console.log(req.body, 'req.body');
//   try {
//     const club = await club.findByPk(req.params.clubId);

//   } catch (err) {
//     next(err);
//   }
// });

module.exports = router;
