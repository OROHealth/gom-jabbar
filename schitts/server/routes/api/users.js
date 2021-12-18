const router = require('express').Router();
const { User } = require('../../db/models');
const { Op } = require('sequelize');

router.get('/users', (req, res, next) => {
  try {
    const users = await User.findAll();

    if (!users) {
      console.log({ error: 'Something went wrong' });
      res.status(401).json({ error: 'Something went wrong' });
    } else {
      res.json({
        ...users.dataValues,
      });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
