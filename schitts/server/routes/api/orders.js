const router = require('express').Router();
const { Order } = require('../../db/models');
// const { Op } = require('sequelize');

router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll();

    if (!orders) {
      console.log({ error: 'Something went wrong' });
      res.status(401).json({ error: 'Something went wrong' });
    } else {
      res.json({
        ...orders.dataValues,
      });
    }
  } catch (error) {
    next(error);
  }
});

router.post('/newOrder', async (req, res, next) => {
  try {
    // expects { date, user, items, tone, numberOfCustomers, splitOfBill, total, totalPerBill, feedback } in req.body
    const {
      date,
      user,
      items,
      tone,
      numberOfCustomers,
      splitOfBill,
      total,
      totalPerBill,
      feedback,
    } = req.body;
    if (
      !date ||
      !user ||
      !items ||
      !tone ||
      !numberOfCustomers ||
      !splitOfBill ||
      !total ||
      !totalPerBill ||
      !feedback
    )
      return res.status(400).json({ error: 'All required' });

    const order = await Order.create(req.body);
    res.json({
      ...order.dataValues,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
