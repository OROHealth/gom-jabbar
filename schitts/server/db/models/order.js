const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
  date: String,
  waiter: String,
  hour: String,
  item: String,
  tone: String,
  number_of_customer: Number,
  split_of_bill: {
    option: String,
    ratio: Number,
  },
});

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;
