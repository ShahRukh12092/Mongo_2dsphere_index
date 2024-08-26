const mongoose = require('mongoose');

// Define the Mongoose schema
const LocationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: {
            type: String,
            enum: ['Point'], // 'location.type' must be 'Point'
            required: true
        },
        coordinates: {
            type: [Number], // Array of numbers
            required: true
        }
    }
});

// Create a 2dsphere index on the location field
LocationSchema.index({ location: '2dsphere' });

// Export the Location model
const Location = mongoose.model('Location', LocationSchema);
module.exports = Location;
