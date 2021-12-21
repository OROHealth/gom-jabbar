const router = require('express').Router();

router.use('/items', require('./items'));
router.use('/orders', require('./orders'));
router.use('/users', require('./users'));
router.use('/customer', require('./customer'));
router.use('/analytics', require('./analytics'));

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

module.exports = router;
