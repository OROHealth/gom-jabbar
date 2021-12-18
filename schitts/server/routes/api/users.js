const router = require('express').Router();
const { User } = require('../../db/models');

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll();

    if (!users) {
      console.log({ error: 'Something went wrong' });
      res.status(401).json({ error: 'Something went wrong' });
    } else {
      const allUsers = new Array();

      for (let i = 0; i < users.length; i++) {
        const user = users[i];
        const userJSON = user.toJSON();
        allUsers.push(userJSON);
      }

      allUsers.sort(function (a, b) {
        if (a.username < b.username) {
          return -1;
        }
        if (a.username > b.username) {
          return 1;
        }
        return 0;
      });

      res.json({
        allUsers,
      });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
