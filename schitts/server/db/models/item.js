const Sequelize = require('sequelize');
const db = require('../db');

const Item = db.define('item', {
  date: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  type: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  acceptableLevel: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  lengthOfTime: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = Item;
