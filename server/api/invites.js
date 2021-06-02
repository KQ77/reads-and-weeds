const { Invite, Club } = require('../db/seed/seed');

const router = require('express').Router();

router.get('/:id', async (req, res, next) => {
  //if member is not logged in - redirect to log in page/component -- or handle this in middleware?
  res.send(await Invite.findByPk(req.params.id, { include: [Club] }));
});

module.exports = router;
