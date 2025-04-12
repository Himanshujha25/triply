// models/Itinerary.js
const mongoose = require("mongoose");

const itinerarySchema = new mongoose.Schema(
  {
    from: String,
    destination: String,
    budget: String,
    preferences: String,
    arrivalDate: String,
    departureDate: String,
    itinerary: [
      {
        day: Number,
        activity: String,
      },
    ],
  },
  { timestamps: true } // This adds createdAt and updatedAt automatically
);

module.exports = mongoose.model("Itinerary", itinerarySchema);
