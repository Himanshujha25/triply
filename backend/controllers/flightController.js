const axios = require("axios");

exports.searchFlights = async (req, res) => {
  const { destination } = req.body;

  if (!destination) {
    return res.status(400).json({ message: "Destination is required." });
  }

  try {
    const response = await axios.get("http://api.aviationstack.com/v1/flights", {
      params: {
        access_key: process.env.AVIATIONSTACK_API_KEY,
        arr_iata: destination, // IATA code of destination (e.g., DEL, JFK, etc.)
      },
    });

    const flights = response.data.data.slice(0, 5).map((flight) => ({
      airline: flight.airline.name,
      departure: flight.departure.iata,
      arrival: flight.arrival.iata,
      price: Math.floor(Math.random() * 500 + 100), // Mock price
    }));

    res.status(200).json({ flights });
  } catch (error) {
    console.error("❌ Error fetching flights:", error.response?.data || error.message);
    res.status(500).json({ message: "Failed to fetch flight data." });
  }
};
