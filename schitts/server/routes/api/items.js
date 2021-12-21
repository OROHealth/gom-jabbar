const router = require('express').Router();
const { Item } = require('../../db/models');

router.get('/', async (req, res, next) => {
  try {
    const items = await Item.findAll();

    if (!items) {
      console.log({ error: 'Something went wrong' });
      res.status(401).json({ error: 'Something went wrong' });
    } else {
      const allItems = new Array();
      const food = new Array();
      const drinks = new Array();
      const mocktails = new Array();

      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const itemJSON = item.toJSON();
        allItems.push(itemJSON);
        if (itemJSON.type === 'food') food.push(itemJSON);
        if (itemJSON.type === 'drink') drinks.push(itemJSON);
        if (itemJSON.type === 'mocktail') mocktails.push(itemJSON);
      }

      allItems.sort(function (a, b) {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
      food.sort(function (a, b) {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
      drinks.sort(function (a, b) {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });

      res.json({
        allItems,
        food,
        drinks,
        mocktails,
      });
    }
  } catch (error) {
    next(error);
  }
});

router.post('/addItem', async (req, res, next) => {
  try {
    if (!req.body.name) {
      return res.sendStatus(401);
    }

    const item = await Item.create(req.body);
    res.json({
      ...item.dataValues,
    });
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(401).json({ error: 'Item already exists' });
    } else if (error.name === 'SequelizeValidationError') {
      return res.status(401).json({ error: 'Validation error' });
    } else next(error);
  }
});

router.patch('/editItem/:item', async (req, res, next) => {
  try {
    if (!req.body.name) {
      return res.sendStatus(401);
    }
    const { date, type, name, price, acceptableLevel, lengthOfTime } = req.body;
    const itemName = req.params.item;

    const item = await Item.findOne({
      where: {
        name: itemName,
      },
    });

    if (!item) {
      console.log({ error: `No item found for item: ${name}` });
      res.status(401).json({ error: 'Wrong item' });
    } else {
      await Item.update(
        {
          date: date,
          type: type,
          name: name,
          price: price,
          acceptableLevel: acceptableLevel,
          lengthOfTime: lengthOfTime,
        },
        {
          where: {
            name: itemName,
          },
        }
      );
    }
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

router.delete('/deleteItem/:item', async (req, res, next) => {
  try {
    await Item.destroy({
      where: {
        name: req.params.item,
      },
    });
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});
module.exports = router;
