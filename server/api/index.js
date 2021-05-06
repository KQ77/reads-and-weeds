const router = require('express').Router();

router.use('/auth', require('./auth'));
router.use('/members', require('./members'));
router.use('/clubs', require('./clubs'));

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
module.exports = router;
