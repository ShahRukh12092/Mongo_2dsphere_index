const express = require('express');
const router = express.Router();
const locationController = require('../controllers/locationController');

// Route for creating a new location
router.post('/', locationController.createLocation);

// Route to find locations near a point
router.get('/near', locationController.findNearbyLocations);

// Route to find locations within a polygon
router.get('/within-polygon', locationController.findLocationsWithinPolygon);

// Route to find locations within a circle
router.get('/within-circle', locationController.findLocationsWithinCircle);

// Route to find nearest location
router.get('/nearest', locationController.findNearestLocation);

module.exports = router;
