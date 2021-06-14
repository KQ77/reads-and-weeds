const router = require('express').Router();
const { Club, Request, Member } = require('../db/seed/seed');

router.post('/clubs', async (req, res, next) => {
  try {
    const { searchTerm } = req.body;
    const clubs = await Club.findAll({ include: [Request, Member] });
    const searchResults = clubs.filter(
      (club) =>
        club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        club.location.includes(searchTerm)
    );
    console.log(searchResults, 'search results');
    if (searchResults.length) {
      res.status(200).send(searchResults);
    } else {
      res.status(200).send([]);
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
