const axios = require('axios');
require('dotenv').config();

const API_KEY = process.env.ORS_API_KEY;

const transportController = {
  getTransportOptions: async (req, res) => {
    try {
      const { from, destination } = req.body;

      if (!from || !destination) {
        return res.status(400).json({
          success: false,
          message: "Origin and destination are required"
        });
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

      const modes = {
        driving: 'driving-car',
        walking: 'foot-walking',
        bicycling: 'cycling-regular'
      };

      const options = [];

      for (const [mode, profile] of Object.entries(modes)) {
        const response = await axios.post(
          `https://api.openrouteservice.org/v2/directions/${profile}/geojson`,
          {
            coordinates: [fromCoords, toCoords]
          },
          {
            headers: {
              Authorization: `Bearer ${API_KEY}`,
              'Content-Type': 'application/json'
            }
          }
        );

        const segment = response.data.features[0].properties.segments[0];

        options.push({
          mode,
          distance: `${(segment.distance / 1000).toFixed(2)} km`,
          duration: `${(segment.duration / 60).toFixed(1)} min`
        });
      }

      // Dynamic mock pricing logic
      const dynamicPricing = async () => {
        const distanceEstimate = Math.floor(Math.random() * 100) + 50;
        return {
          flight: { cost: (distanceEstimate * 0.8).toFixed(0) + ' INR', provider: 'Air India' },
          train: { cost: (distanceEstimate * 0.3).toFixed(0) + ' INR', provider: 'Indian Railways' },
          metro: { cost: (distanceEstimate * 0.25).toFixed(0) + ' INR', provider: 'Metro Services' },
          bus: { cost: (distanceEstimate * 0.2).toFixed(0) + ' INR', provider: 'State Transport' }
        };
      };

      const prices = await dynamicPricing();

      for (const [mode, info] of Object.entries(prices)) {
        options.push({
          mode,
          cost: info.cost,
          provider: info.provider
        });
      }

      return res.status(200).json({
        success: true,
        options
      });

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
