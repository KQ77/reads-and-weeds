const router = require('express').Router();
const { hasAccess } = require('../middleware');
const { ClubMembers } = require('../db/seed/seed');

//who should be able to delete themselves? have to be logged in, have to be member of that club aka hasAccess
router.delete('/:clubId/:memberId', hasAccess, async (req, res, next) => {
  try {
    const { clubId, memberId } = req.params;
    const clubmember = await ClubMembers.findOne({
      where: { clubId, memberId },
    });
    await clubmember.destroy();
    res.status(204).redirect(`/bookclubs/${clubId}`);
  } catch (err) {
    next(err);
  }
});
module.exports = router;
