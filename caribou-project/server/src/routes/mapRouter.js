const mapRouter = require('express').Router();
const { getAllMapLocations, seedMap, assigningMapToUser } = require('../controllers/mapController');

// @Desc    Get all Users
// @Method  GET
// @Route   /api/v1/map/query?=locations
mapRouter.get('/query?=locations', getAllMapLocations);

// @Desc    Post Map Locations To the database
// @Method  GET
// @Route   /api/v1/map/query?=seedMap
mapRouter.get('/query?=seedMap', seedMap);

// @Desc    Post Map Locations To the database
// @Method  POST
// @Route   /api/v1/map/assign/:map/:user
mapRouter.get('/assign/:map/:user', assigningMapToUser);

module.exports = mapRouter;
