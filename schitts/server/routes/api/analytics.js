const router = require('express').Router();
const { Order, Customer } = require('../../db/models');
const { Op } = require('sequelize');

router.get('/8rated-6months/:user', async (req, res, next) => {
  try {
    if (!req.params.user) {
      return res.status(401).json({ error: 'Something went wrong' });
    }

    const orders = await Order.findAll({
      where: {
        user: req.params.user,
      },
    });

    for (let i = 0; i < orders.length; i++) {
      const order = orders[i];
      const orderJSON = order.toJSON();

      // find orders from only past 6 months
      let orderDate = new Date(orderJSON.date);
      let today = new Date();
      const b = orderDate.getMonth();
      const a = today.getMonth();
      let difference;
      if (b > a) {
        difference = a + (12 - b);
      } else {
        difference = a - b;
      }

      orderJSON.difference = difference;

      //find 8-rated items
      orderJSON.ratedMeals = 0;
      orderJSON.totalRatedEarnings = 0;
      orderJSON.ratedRating = 0;
      for (let j = 0; j < orderJSON.items.length; j++) {
        orderJSON.items[j] = JSON.parse(orderJSON.items[j]);
        if (orderJSON.items[j].acceptableLevel >= 8) {
          orderJSON.ratedMeals++;
          orderJSON.totalRatedEarnings += orderJSON.items[j].price;
          orderJSON.ratedRating += orderJSON.feedback;
        }
      }

      // find median rating for 8-rated items
      if (orderJSON.ratedMeals > 0) {
        orderJSON.medianRatedRating = orderJSON.feedback / orderJSON.ratedMeals;
      }

      orders[i] = orderJSON;
    }
    const orders_past_6months = orders.filter(
      (a) => a.difference < 7 && a.ratedMeals > 0
    );
    res.json({ orders_past_6months });
  } catch (error) {
    next(error);
  }
});

router.get('/drinks-taken/:user1/:user2', async (req, res, next) => {
  try {
    if (!req.params.user1 || !req.params.user2) {
      return res.status(401).json({ error: 'Both users required' });
    }

    const { user1, user2 } = req.params;

    const orders = await Order.findAll({
      where: {
        [Op.or]: [
          {
            user: user1,
          },
          { user: user2 },
        ],
      },
    });

    let count1 = 0;
    let count2 = 0;
    let evolution1 = new Array();
    let evolution2 = new Array();
    let together = new Array();

    for (let i = 0; i < orders.length; i++) {
      const order = orders[i];
      const orderJSON = order.toJSON();
      for (let j = 0; j < orderJSON.items.length; j++) {
        orderJSON.items[j] = JSON.parse(orderJSON.items[j]);
        if (orderJSON.items[j].type === 'drink') {
          if (orderJSON.user === user1) {
            count1++;
          }
          if (orderJSON.user === user2) {
            count2++;
          }
        }
        let date = new Date(orderJSON.date);
        let day = date.getDate();
        let month = date.getMonth();

        const months = [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'June',
          'July',
          'Aug',
          'Sept',
          'Oct',
          'Nov',
          'Dec',
        ];

        const label = `${months[month]}` + ` ` + `${day}`;

        together.push({
          label: label,
          evo1: count1,
          evo2: count2,
          y: count1 + count2,
        });
      }
    }

    for (let i = 0; i < together.length; i++) {
      const a = together[i];
      evolution1.push({ label: a.label, y: a.evo1 });
      evolution2.push({ label: a.label, y: a.evo2 });
    }

    res.json({
      evolution1,
      evolution2,
      together,
    });
  } catch (err) {
    next(err);
  }
});

router.get('/mocktailToReview/:user', async (req, res, next) => {
  try {
    if (!req.params.user) {
      return res.status(401).json({ error: 'Something went wrong' });
    }

    const orders = await Order.findAll({
      where: {
        user: req.params.user,
      },
    });

    let mocktails = new Array();
    let reviews = new Array();

    for (let i = 0; i < orders.length; i++) {
      const order = orders[i];
      const orderJSON = order.toJSON();
      for (let j = 0; j < orderJSON.items.length; j++) {
        orderJSON.items[j] = JSON.parse(orderJSON.items[j]);
        if (orderJSON.items[j].type === 'mocktail') {
          let d = new Date(orderJSON.date);
          let day = d.getDate();
          let month = d.getMonth();

          const months = [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'June',
            'July',
            'Aug',
            'Sept',
            'Oct',
            'Nov',
            'Dec',
          ];

          const date = `${months[month]}` + ` ` + `${day}`;

          // populate mocktails list without pre-determined mocktail list
          // **must not need to change code if boss adds mocktail to menu
          const idx = mocktails.findIndex(
            (a) => a.name === orderJSON.items[j].name
          );
          if (idx === -1) {
            mocktails.push({
              name: orderJSON.items[j].name,
              data: [{ x: date, y: 1 }],
            });
          } else {
            if (mocktails[idx].data.date === date) {
              mocktails[idx].data.y += 1;
            } else {
              mocktails[idx].data.push({
                name: orderJSON.items[j].name,
                data: [{ x: date, y: 1 }],
              });
            }
          }
          reviews.push({
            x: date,
            y: orderJSON.feedback,
          });
        }
      }
    }
    res.json({ mocktails, reviews });
  } catch (error) {
    next(error);
  }
});

router.get('/out-of-town-customers', async (req, res, next) => {
  try {
    const customers = await Customer.findAll({
      where: {
        type: 'out of town',
      },
    });

    if (!customers) {
      console.log({ error: 'Something went wrong' });
      res.status(401).json({ error: 'Something went wrong' });
    } else {
      const allCustomers = new Array();

      for (let i = 0; i < customers.length; i++) {
        const customer = customers[i];
        const customerJSON = customer.toJSON();
        allCustomers.push(customerJSON);
      }

      allCustomers.sort(function (a, b) {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });

      res.json({
        allCustomers,
      });
    }
  } catch (error) {
    next(error);
  }
});

router.get('/find-customer/:customer', async (req, res, next) => {
  try {
    if (!req.params.customer) {
      return res.status(401).json({ error: 'Customer required' });
    }

    const customer = await Customer.findOne({
      where: {
        name: req.params.customer,
      },
    });

    if (!customer) {
      console.log({
        error: `No customer found for customer: ${req.params.customer}`,
      });
      res.status(401).json({ error: 'Wrong customer name' });
    } else {
      res.json({
        customer,
      });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
