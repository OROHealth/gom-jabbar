const Sequelize = require('sequelize');
const db = require('../db');

const Customer = db.define('customer', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  type: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  drinkPreference: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  foodPreference: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

module.exports = Customer;
