const mapRouter = require('express').Router();
const { getAllMapLocations, postAMapLocation } = require('../controllers/mapController');
// Base Route - /api/v1/map

// @Desc    Save Map location
// @Method  POST
// @Route   /api/v1/map/post=location
mapRouter.post('/post=location', postAMapLocation);

// @Desc    Get all Maps Locations
// @Method  GET
// @Route   /api/v1/map + /query=Map-Locations
mapRouter.get('/query=Map-Locations', getAllMapLocations);
module.exports = mapRouter;
