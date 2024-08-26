const { Location } = require('../models');

// Controller for creating a new location
exports.createLocation = async (req, res) => {
    try {
        const { name, coordinates } = req.body;

        if (!name || !coordinates || coordinates.length !== 2) {
            return res.status(400).json({ error: 'Invalid input data' });
        }

        const location = new Location({
            name: name,
            location: {
                type: 'Point',
                coordinates: coordinates
            }
        });

        const savedLocation = await location.save();
        res.status(201).json(savedLocation);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while saving the location' });
    }
};

// Find locations near a specific point
exports.findNearbyLocations = async (req, res) => {
    const { latitude, longitude, maxDistance } = req.query;

    if (!latitude || !longitude || !maxDistance) {
        return res.status(400).json({ error: 'Latitude, longitude, and maxDistance are required.' });
    }

    try {
        const locations = await Location.find({
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [parseFloat(longitude), parseFloat(latitude)]
                    },
                    $maxDistance: parseFloat(maxDistance)
                }
            }
        });
        res.json(locations);
    } catch (error) {
        res.status(500).json({ error: 'Error finding nearby locations.' });
    }
};

// controllers/locationController.js
exports.findLocationsWithinPolygon = async (req, res) => {
    const { polygon } = req.query;

    if (!polygon) {
        return res.status(400).json({ error: 'Polygon coordinates are required.' });
    }

    try {
        // Parse the polygon parameter from the query string.
        // Expecting polygon as a JSON-encoded string.
        const parsedPolygon = JSON.parse(polygon);
        if (!Array.isArray(parsedPolygon)) {
            return res.status(400).json({ error: 'Polygon must be an array of coordinates.' });
        }

        const locations = await Location.find({
            location: {
                $geoWithin: {
                    $polygon: parsedPolygon
                }
            }
        });

        res.json(locations);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Error finding locations within polygon.' });
    }
};

// Find locations within a circle
exports.findLocationsWithinCircle = async (req, res) => {
    const { latitude, longitude, radius } = req.query;

    if (!latitude || !longitude || !radius) {
        return res.status(400).json({ error: 'Latitude, longitude, and radius are required.' });
    }

    // Validate the parameters
    const lat = parseFloat(latitude);
    const lon = parseFloat(longitude);
    const rad = parseFloat(radius);

    if (isNaN(lat) || isNaN(lon) || isNaN(rad)) {
        return res.status(400).json({ error: 'Latitude, longitude, and radius must be valid numbers.' });
    }

    try {
        const locations = await Location.find({
            location: {
                $geoWithin: {
                    $centerSphere: [[lon, lat], rad / 3963.2]  // Radius is in miles; divide by Earth's radius in miles
                }
            }
        });

        res.json(locations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error finding locations within circle.' });
    }
};
// controllers/locationController.js
exports.findNearestLocation = async (req, res) => {
    const { latitude, longitude } = req.query;

    if (!latitude || !longitude) {
        return res.status(400).json({ error: 'Latitude and longitude are required.' });
    }

    try {
        const location = await Location.aggregate([
            {
                $geoNear: {
                    near: {
                        type: "Point",
                        coordinates: [parseFloat(longitude), parseFloat(latitude)] // [longitude, latitude]
                    },
                    distanceField: "distance",
                    spherical: true
                }
            },
            {
                $sort: { distance: 1 } // Sort by distance to get the nearest one
            },
            {
                $limit: 5 // Limit to the nearest location
            }
        ]);

        if (location.length > 0) {
            res.json(location);
        } else {
            res.status(404).json({ message: 'No location found.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error finding the nearest location.' });
    }
};

