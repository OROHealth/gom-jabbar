const Sequelize = require('sequelize');
const db = require('../db');

const Order = db.define('order', {
  date: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  user: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  items: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    allowNull: false,
  },
  tone: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  numberOfCustomers: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  splitOfBill: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  total: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  totalPerBill: {
    type: Sequelize.DECIMAL,
    allowNull: false,
  },
  feedback: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Order;
