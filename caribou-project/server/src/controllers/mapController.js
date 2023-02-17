const MapModel = require('../models/mapModel');
const UserModel = require('../models/userModel');
const mongoose = require('mongoose');
const { registerUser } = require('./userController');
import { usersData, mapsData } from './mapData';
const toId = mongoose.Types.ObjectId;
// const log = require('../utils/logger');
// const { lowerCase, signAccessToken, signRefreshToken, verifyRefreshToken } = require('../helpers/helpers');
// const createError = require('http-errors');

// @Desc     Display all Users
// @Method   GET
// @Route    /api/v1/map/query?=locations
async function getAllMapLocations(_req, res) {
  // populate, instead of showing the id, it will show the user name
  res.json(await MapModel.find({}).populate({ path: 'user', model: 'User' }));
}

// @Desc    creating users and Maps with email and password
// @Method  GET
// @Route   /api/v1/map/query?=seedMap
async function seedMap(_req, res) {
  const newMap = await MapModel.create(mapsData);
  const newUser = await UserModel.create(usersData);
  console.log(newUser);
  console.log('newUser: ', newUser);
  console.log('newMap: ', newMap);

  res.json({ newUser, newMap });
}

// @Desc    Assigning users to maps
// @Method  GET
// @Route   /api/v1/map/assign/:map/:user
const assigningMapToUser = async (req, res) => {
  request.params.user = toId(req.params.user);
  // request.params.map = toId(req.params.map);
  const map = await MapModel.findById(req.params.map);
  map.user = req.params.user;
  map.save();
  res.json({ map });
};

module.exports = {
  getAllMapLocations,
  seedMap,
  assigningMapToUser,
};
