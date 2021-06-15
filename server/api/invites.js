const { Invite, Club, Request, Member } = require('../db/seed/seed');

const router = require('express').Router();

router.get('/:id', async (req, res, next) => {
  //if member is not logged in - redirect to log in page/component -- or handle this in middleware?
  try {
    console.log(req.params.id, 'req.params.id');
    const invite = await Invite.findByPk(req.params.id, {
      include: [{ model: Club, include: [Request, Member] }],
    });
    res.status(200).send(invite);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const invite = await Invite.findByPk(req.params.id);
    await invite.destroy();
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
