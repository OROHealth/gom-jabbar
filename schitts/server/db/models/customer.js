const mongoose = require('mongoose');

const CustomerSchema = mongoose.Schema({
  full_name: String,
  residing: String,
  drink_preference: String,
  food_preference: String,
  mocktail_preference: String,
});

const Customer = mongoose.model('Customer', CustomerSchema);

module.exports = Customer;
