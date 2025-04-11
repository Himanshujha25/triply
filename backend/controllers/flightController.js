const { getIataByCity } = require("../iataCodes");
const axios = require('axios');

exports.searchFlights = async (req, res) => {
  const { from, destination, arrivalDate, departureDate } = req.body;

  console.log("📩 Received request with:", { from, destination, arrivalDate, departureDate });

  if (!from || !destination) {
    return res.status(400).json({ message: "'from' and 'destination' cities are required." });
  }

  const departureIATA = getIataByCity(from);
  const arrivalIATA = getIataByCity(destination);

  if (!departureIATA || !arrivalIATA) {
    return res.status(404).json({ message: "City not supported." });
  }

  try {
    const response = await axios.get("http://api.aviationstack.com/v1/flights", {
      params: {
        access_key: process.env.AVIATIONSTACK_API_KEY,
        dep_iata: departureIATA,
        arr_iata: arrivalIATA,
      },
    });

    const flights = (response.data?.data || []).slice(0, 5).map((flight) => ({
      airline: flight.airline?.name || "Unknown Airline",

      departure: flight.departure?.iata || "N/A",
      departureAirport: flight.departure?.airport || "Unknown Airport",
      departureCity: flight.departure?.city || "Unknown City",
      departureTime: flight.departure?.estimated || flight.departure?.scheduled || null,

      arrival: flight.arrival?.iata || "N/A",
      arrivalAirport: flight.arrival?.airport || "Unknown Airport",
      arrivalCity: flight.arrival?.city || "Unknown City",
      arrivalTime: flight.arrival?.estimated || flight.arrival?.scheduled || null,

      price: Math.floor(Math.random() * 500 + 100),
    }));

    res.status(200).json({ flights });
  } catch (error) {
    console.error("❌ Error fetching flights:", error.response?.data || error.message);
    res.status(500).json({ message: "Failed to fetch flight data." });
  }
};
