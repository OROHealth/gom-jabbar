const Sequelize = require('sequelize');
const db = require('../db');

const User = db.define('user', {
  username: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  photoUrl: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

module.exports = User;
