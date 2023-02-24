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
  log('info', 'App Currently Getting all the Map Marker Locations in the Database', 'mapController');
  const locations = await MapModel.find({}).populate({ path: 'user', model: 'User' });
  log('info', 'Locations Found, Sent them to the Frontend :)', 'mapController');
  res.status(200).json({ locations });
  return;
}

// @Desc     Create a pin in the database
// @Method   POST
// @Route    /api/v1/map/post=location
async function postAMapLocation(req, res) {
  const { excitementLevel, trashingLevel, labelName, xName, yName } = req.body;

  // log('info', `Line 29: Req Payload: ${req.payload}`, 'mapController');
  // log('info', `Line 30: ${req.body}`, 'mapController');
  let errors = [];

  if (!excitementLevel && !trashingLevel && !labelName && !xName && !yName) {
    errors.push({ errorMsg: 'Something went wrong!' });
    return res.status(400).json(errors).end();
  }

  if (errors.length > 0) {
    return res.status(400).json(errors).end();
  }

  // Find the user who made the request and
  const user = await UserModel.findOneAndUpdate({ uuid: req.payload.aud });
  // log('info', `Line 43: User: ${user}`, 'mapController');

  // If no user found
  if (user === null || !user) {
    // log('info', `Line 45: No User: ${user}`, 'mapController');
    errors.push({ errorMsg: 'There is no account associated with this post. Please Log out, and log back in to continue!' });
    return res.status(400).json(errors).end();
  }

  // Saving
  await MapModel.findOne({ labelName: labelName }).then(async foundLabel => {
    // log('Info', `Line 56: foundLabel: ${labelName}`, 'mapController');

    if (foundLabel !== null) {
      // If location name Already Exists.
      errors.push({ errorMsg: 'These coordinates already exists!' });
      return res.status(400).json(errors).end();
    } else {
      // Preparing to save the new location
      const newLocation = new MapModel({
        labelName: lowerCase(labelName),
        trashingLevel: Number(trashingLevel),
        excitementLevel: Number(excitementLevel),
        x: xName,
        y: yName,
      });

      // Saving new Location to database
      await newLocation
        .save()
        .then(async locationSaved => {
          // log('info', `Line 74: LocationSaved: ${locationSaved}`, 'userController');

          // Check if a user is found. > If there is no User
          if (!user.location) {
            log('error', `Line: 81: Error Saving new Location`, 'mapController');
            errors.push({ errorMsg: 'Error saving new location! Please sign in again to resolve' });
            return res.status(400).json(errors).end();
          }
          await user.location.push(locationSaved);
          user.save();
          return res.status(201).json({
            labelName,
            trashingLevel,
            excitementLevel,
            x: xName,
            y: yName,
          });
        })
        .catch(err => {
          log('error', `Line: 89: Error Saving newLocation: ${err}, with errorCode ${err.code}`, 'mapController');
          if (err.code === 11000) {
            log('error', `Line: 92:  Duplicate Location Error`, 'mapController');
            errors.push({ errorMsg: 'Duplicate Location! Please try another location' });
            return res.status(400).json(errors).end();
          }
        });
    }
  });
}

module.exports = {
  getAllMapLocations,
  postAMapLocation,
};
