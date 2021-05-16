const router = require('express').Router();

router.use('/auth', require('./auth'));
router.use('/members', require('./members'));
router.use('/clubs', require('./clubs'));
router.use('/books', require('./books'));
router.use('/suggestions', require('./suggestions'));

router.use((req, res, next) => {
  console.log('route not found');
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

module.exports = router;
