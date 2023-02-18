const MapModel = require('../models/mapModel');
const mongoose = require('mongoose');
const log = require('../utils/logger');
const createError = require('http-errors');
const { lowerCase } = require('../helpers/helpers');
const UserModel = require('../models/userModel');
// const { registerUser } = require('./userController');
// const { usersData, mapsData } = require('./mapData');
// const { lowerCase, signAccessToken, signRefreshToken, verifyRefreshToken } = require('../helpers/helpers');

// @Desc     Display all Locations on the map
// @Method   GET
// @Route    /api/v1/map + /query=Map-Locations
async function getAllMapLocations(_req, res) {
  // populate, instead of showing the id, it will show the user name
  console.log('Arrive!!!');
  console.log('Currently Getting all Map Locations');
  const locations = await MapModel.find({}).populate({ path: 'user', model: 'User' });
  console.log('Locations Found', locations);
  res.json({ locations });
  return;
}

// @Desc     Create a pin in the database
// @Method   POST
// @Route    /api/v1/map/post=location
async function postAMapLocation(req, res) {
  const { excitementLevel, trashingLevel, labelName, xName, yName } = req.body;

  // console.log(req.body);
  let errors = [];

  if (errors.length > 0) {
    return res.json(errors);
  }
  // log('info', req.payload.aud, 'mapController');
  const user = await UserModel.findOneAndUpdate({ uuid: req.payload.aud });

  await MapModel.findOne({ labelName: labelName }).then(async foundLabel => {
    console.log(foundLabel);
    if (foundLabel === null) {
      // If Location Already Exists. Then we displayed in the frontend a message
      errors.push({ errorMsg: 'These coordinates already exists!' });
      return res.json(errors).end();
    } else {
      const newLocation = new MapModel({
        labelName: lowerCase(labelName),
        trashingLevel: Number(trashingLevel),
        excitementLevel: Number(excitementLevel),
        x: xName,
        y: yName,
      });

      await newLocation
        .save()
        .then(locationSaved => {
          log('info', `locationSaved: ${locationSaved}`, 'userController');
          user.location.push(locationSaved);
          user.save();
        })
        .catch(err => {
          log('error', `Error Saving newUser: ${err}`, 'userController');
        });
      res.status(201).json({
        labelName,
        trashingLevel,
        excitementLevel,
        x: xName,
        y: yName,
      });
    }
    return;
  });
}

module.exports = {
  getAllMapLocations,
  postAMapLocation,
};
