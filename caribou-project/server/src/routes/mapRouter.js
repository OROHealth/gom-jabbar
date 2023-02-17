const mapRouter = require('express').Router();
const { getAllMapLocations, postAMapLocation } = require('../controllers/mapController');
// BAse Route - /api/v1/map

// @Desc    Get all Maps
// @Method  GET
// @Route   /api/v1/map/query?=locations
mapRouter.get('/query?=locations', getAllMapLocations);

// @Desc    Save Map location
// @Method  GET
// @Route   /api/v1/map/post=location
mapRouter.post('/post=location', postAMapLocation);

module.exports = mapRouter;
