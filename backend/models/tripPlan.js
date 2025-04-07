const mongoose = require('mongoose');

// Define the schema for the trip plan
const tripPlanSchema = new mongoose.Schema({
    destination: {
        type: String,
        required: true
    },
    days: {
        type: Number,
        required: true
    },
    preferences: {
        type: [String],
        required: true
    },
    tripPlan: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create and export the TripPlan model
const TripPlan = mongoose.model('TripPlan', tripPlanSchema);
module.exports = TripPlan;
