const router = require('express').Router();
const { User } = require('../../db/models');

router.post('/register', async (req, res, next) => {
  try {
    // expects {username} in req.body
    const { username } = req.body;

    if (!username) {
      return res.status(400).json({ error: 'Username required' });
    }

    const user = await User.create(req.body);
    res.json({
      ...user.dataValues,
    });
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(401).json({ error: 'User already exists' });
    } else if (error.name === 'SequelizeValidationError') {
      return res.status(401).json({ error: 'Validation error' });
    } else next(error);
  }
});

module.exports = router;
