const mongoose = require('mongoose');
const router = require('express').Router();
const { Item, Order, Customer, Feedback } = require('../db/index');

router.post('/items', (req, res) => {
  const body = req.body;

  new Item({
    _id: mongoose.Types.ObjectId(),
    name: body.name,
    type: body.type,
    price: body.price,
    acceptable_level: body.acceptable_level,
    date: body.date,
    length: body.length,
  }).save((err, data) => {
    if (err) {
      console.error(
        'Unable to add item. Error JSON:',
        JSON.stringify(err, null, 2)
      );
      res.json({ message: 'Error has occurred' });
    } else {
      res.json({ message: 'Added item', Added: data });
    }
  });
});

router.post('/order', (req, res) => {
  const body = req.body;

  new Order({
    _id: mongoose.Types.ObjectId(),
    date: body.date,
    waiter: body.waiter,
    hour: body.hour,
    item: body.item,
    tone: body.tone,
    number_of_customer: body.number_of_customer,
    split_of_bill: body.split_of_bill,
  }).save((err, data) => {
    if (err) {
      console.error(
        'Unable to add order. Error JSON:',
        JSON.stringify(err, null, 2)
      );
      res.json({ message: 'Error has occurred' });
    } else {
      res.json({ message: 'Added order', Added: data });
    }
  });
});

router.post('/customer', (req, res) => {
  const body = req.body;

  new Customer({
    _id: mongoose.Types.ObjectId(),
    full_name: body.full_name,
    residing: body.residing,
    drink_preference: body.drink_preference,
    food_preference: body.food_preference,
    mocktail_preference: body.mocktail_preference,
  }).save((err, data) => {
    if (err) {
      console.error(
        'Unable to add order. Error JSON:',
        JSON.stringify(err, null, 2)
      );
      res.json({ message: 'Error has occurred' });
    } else {
      res.json({ message: 'Added customer', Added: data });
    }
  });
});

router.post('/feedback', (req, res) => {
  const body = req.body;

  new Feedback({
    _id: mongoose.Types.ObjectId(),
    customer: body.customer,
    waiter: body.waiter,
    item: body.item,
    rating: body.rating,
    comment: body.comment,
  }).save((err, data) => {
    if (err) {
      console.error(
        'Unable to add order. Error JSON:',
        JSON.stringify(err, null, 2)
      );
      res.json({ message: 'Error has occurred' });
    } else {
      res.json({ message: 'Added feedback', Added: data });
    }
  });
});

module.exports = router;
