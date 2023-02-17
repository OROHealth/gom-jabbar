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

// @Desc    Post Map Locations To the database
// @Method  GET
// @Route   /api/v1/map/query?=seedMap
// mapRouter.get('/query?=seedMap', seedMap);

// // @Desc    Post Map Locations To the database
// // @Method  POST
// // @Route   /api/v1/map/assign/:map/:user
// mapRouter.get('/assign/:map/:user', assigningMapToUser);

module.exports = mapRouter;
