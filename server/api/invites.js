const { Invite, Club } = require('../db/seed/seed');

const router = require('express').Router();

router.get('/:id', async (req, res, next) => {
  //if member is not logged in - redirect to log in page/component -- or handle this in middleware?
  try {
    res.send(await Invite.findByPk(req.params.id, { include: [Club] }));
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
