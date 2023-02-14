const UserModel = require('../models/userModel');
// const bcrypt = require('bcryptjs');
// const path = require('path');
// const { nextTick } = require('process')

// @Desc     Display all Users
// @Method   GET
// @Route    /api/v1/users
async function getAllUsers(_req, res) {
  res.json(await UserModel.find({}));
  // res.json({ message: 'Hello' });
}

module.exports = {
  getAllUsers,
};
