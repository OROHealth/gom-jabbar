const MapModel = require('../models/mapModel');
const log = require('../utils/logger');
const { lowerCase } = require('../helpers/helpers');
const UserModel = require('../models/userModel');

// @Desc     Display all Locations on the map
// @Method   GET
// @Route    /api/v1/map + /query=Map-Locations
async function getAllMapLocations(_req, res) {
  // populate, instead of showing the id, it will show the user name
  log('info', 'App Currently Getting all the Map Marker Locations in the Database', 'mapController');
  const locations = await MapModel.find({}).populate({ path: 'user', model: 'User' });
  log('info', 'Locations Found, Sent them to the Frontend :)', 'mapController');
  res.status(200).json({ locations }).end();
  return;
}

// @Desc     Create a pin in the database
// @Method   POST
// @Route    /api/v1/map/post=location
async function postAMapLocation(req, res) {
  const { excitementLevel, trashingLevel, labelName, xName, yName } = req.body;

  let errors = [];

  if (!excitementLevel && !trashingLevel && !labelName && !xName && !yName) {
    errors.push({ errorMsg: 'Something went wrong!' });
    res.status(400).json(errors).end();
    return (errors = []);
  }

  if (errors.length > 0) {
    res.status(400).json(errors).end();
    return (errors = []);
  }

  // Find the user who made the request and
  const user = await UserModel.findOneAndUpdate({ uuid: req.payload.aud });

  // If no user found
  if (user === null || !user) {
    errors.push({ errorMsg: 'There is no account associated with this post. Please Log out, and log back in to continue!' });
    res.status(400).json(errors).end();
    return (errors = []);
  }

  // Saving
  await MapModel.findOne({ labelName: labelName }).then(async foundLabel => {
    if (foundLabel !== null) {
      // If location name Already Exists.
      errors.push({ errorMsg: 'These coordinates already exists!' });
      res.status(400).json(errors).end();
      return (errors = []);
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
          // Check if a user is found. > If there is no User
          if (!user.location) {
            errors.push({ errorMsg: 'Error saving new location! Please sign in again to resolve' });
            res.status(400).json(errors).end();
            return (errors = []);
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
          log('error', `Line: 85: Error Saving newLocation: ${err}, with errorCode ${err.code}`, 'mapController');
          if (err.code === 11000) {
            log('error', `Line: 87:  Duplicate Location Error`, 'mapController');
            errors.push({ errorMsg: 'Duplicate Location! Please try another location' });
            res.status(400).json(errors).end();
            return (errors = []);
          }
        });
    }
  });
}

module.exports = {
  getAllMapLocations,
  postAMapLocation,
};
