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

router.post('/login', async (req, res, next) => {
  try {
    // expects username and password in req.body
    const { username } = req.body;
    if (!username) return res.status(400).json({ error: 'Username required' });

    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!user) {
      console.log({ error: `No user found for username: ${username}` });
      res.status(401).json({ error: 'Wrong username' });
    } else {
      res.json({
        ...user.dataValues,
      });
    }
  } catch (error) {
    next(error);
  }
});

router.delete('/logout', (req, res, next) => {
  res.sendStatus(204);
});

module.exports = router;
