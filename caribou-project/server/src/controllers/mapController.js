const MapModel = require('../models/mapModel');
const mongoose = require('mongoose');
const log = require('../utils/logger');
const createError = require('http-errors');
const { lowerCase } = require('../helpers/helpers');
const UserModel = require('../models/userModel');
// const { registerUser } = require('./userController');
// const { usersData, mapsData } = require('./mapData');
// const { lowerCase, signAccessToken, signRefreshToken, verifyRefreshToken } = require('../helpers/helpers');

// @Desc     Display all Users
// @Method   GET
// @Route    /api/v1/map/query?=locations
async function getAllMapLocations(_req, res) {
  // populate, instead of showing the id, it will show the user name
  res.json(await MapModel.find({}).populate({ path: 'user', model: 'User' }));
}

// @Desc     Display all Users
// @Method   GET
// @Route    /api/v1/map/post=location
async function postAMapLocation(req, res) {
  const { signalLocation, range } = req.body;
  // console.log(req.body);
  let errors = [];
  let success = [];

  if (errors.length > 0) {
    return res.json(errors);
  }
  log('info', req.payload.aud, 'mapController');
  const user = await UserModel.findOneAndUpdate({ uuid: req.payload.aud });

  await MapModel.findOne({ location: signalLocation }).then(async location => {
    // console.log(location, 'mapController');
    if (location) {
      // If User Already Exists. Then we displayed in the frontend a message
      errors.push({ errorMsg: 'This location already exists!' });
      return res.json(errors);
    } else {
      const newLocation = new MapModel({
        location: lowerCase(signalLocation),
        trashingLevel: Number(range),
      });

      await newLocation
        .save()
        .then(locationSaved => {
          log('info', `locationSaved: ${locationSaved}`, 'userController');
          success.push({ successMsg: 'Location added.' });
          user.location.push(locationSaved);
          user.save();
        })
        .catch(err => {
          log('error', `Error Saving newUser: ${err}`, 'userController');
        });

      res.status(201).json({ signalLocation, range, success });
    }
  });
}

module.exports = {
  getAllMapLocations,
  postAMapLocation,
};
