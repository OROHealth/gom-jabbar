const mongoose = require('mongoose');

const WaiterSchema = mongoose.Schema({
  name: String,
});

const Waiter = mongoose.model('Waiter', WaiterSchema);

module.exports = Waiter;
