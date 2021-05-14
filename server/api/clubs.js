const { Club, Member, Image } = require('../db/seed/seed');

const router = require('express').Router();

router.get('/:clubId', async (req, res, next) => {
  try {
    const club = await Club.findByPk(req.params.clubId, {
      include: [
        { model: Member, attributes: { exclude: ['password'] } },
        { model: Image },
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

module.exports = router;
