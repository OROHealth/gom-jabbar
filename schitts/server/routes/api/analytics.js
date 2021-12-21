const router = require('express').Router();
const { Order } = require('../../db/models');
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
        console.log(orderJSON.feedback);
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

module.exports = router;
