const router = require('express').Router();
const { Item, Order, Customer, Waiter, Feedback } = require('../db/index');

router.get('/items', (req, res) => {
  Item.find({}, (err, data) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(data);
    }
  });
});

router.get('/waiters', (req, res) => {
  Waiter.find({}, (err, data) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(data);
    }
  });
});

router.get('/feedback', (req, res) => {
  Feedback.find({}, (err, data) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(data);
    }
  });
});

router.get('/order', (req, res) => {
  Order.find({}, (err, data) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(data);
    }
  });
});

router.get('/customers', (req, res) => {
  Customer.find({}, (err, data) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(data);
    }
  });
});

module.exports = router;
