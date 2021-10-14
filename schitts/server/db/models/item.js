const mongoose = require('mongoose');

const ItemSchema = mongoose.Schema({
  name: String,
  type: String,
  price: Number,
  acceptable_level: Number,
  date: String,
  length: Number,
});

const Item = mongoose.model('Item', ItemSchema);

module.exports = Item;
