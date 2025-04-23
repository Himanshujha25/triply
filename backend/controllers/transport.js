const axios = require('axios');
require('dotenv').config();

const API_KEY = process.env.ORS_API_KEY;

const transportController = {
  getTransportOptions: async (req, res) => {
    try {
      const { from, destination } = req.body;

      if (!from || !destination) {
        return res.status(400).json({ success: false, message: "Origin and destination are required" });
      }

      const geocode = async (place) => {
        const response = await axios.get("https://api.openrouteservice.org/geocode/search", {
          params: {
            api_key: API_KEY,
            text: place
          }
        });
        return response.data.features[0].geometry.coordinates; // [lon, lat]
      };

      const [fromCoords, toCoords] = await Promise.all([
        geocode(from),
        geocode(destination)
      ]);

      console.log("From coordinates:", fromCoords);
      console.log("To coordinates:", toCoords);

      const modes = {
        car: 'driving-car',
        walking: 'foot-walking',
        bicycle: 'cycling-regular'
      };

      const options = [];

      for (const [mode, profile] of Object.entries(modes)) {
        const response = await axios.post(
          `https://api.openrouteservice.org/v2/directions/${profile}/geojson`,
          { coordinates: [fromCoords, toCoords] },
          {
            headers: {
              Authorization: API_KEY,
              'Content-Type': 'application/json'
            }
          }
        );

        if (!response.data.features[0].properties.segments[0]) {
          return res.status(500).json({ success: false, message: `No data found for mode: ${mode}` });
        }

        const segment = response.data.features[0].properties.segments[0];
        const distanceKm = (segment.distance / 1000).toFixed(2);
        const durationHr = (segment.duration / 3600).toFixed(2);

        console.log(`Mode: ${mode}, Distance: ${distanceKm}, Duration: ${durationHr}`);

        const baseRatePerKm = {
          car: 10,
          walking: 0,
          bicycle: 2
        };

        const costINR = (distanceKm * (baseRatePerKm[mode] || 5)).toFixed(0);
        const costUSD = (costINR / 83).toFixed(2); // USD conversion

        options.push({
          mode,
          distance: `${distanceKm} km`,
          duration: `${durationHr} hr`,
          costINR: `${costINR} INR`,
          costUSD: `$${costUSD}`
        });
      }

      return res.status(200).json({ success: true, options });
    } catch (error) {
      console.error("Error fetching transport options:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to get transport options",
        error: error.message
      });
    }
  }
};

module.exports = transportController;
