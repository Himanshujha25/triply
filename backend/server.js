const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

// Controllers

const accommodation = require('./controllers/accommodation');
const tripController = require("./controllers/tripController");
const flightController = require("./controllers/flightController");

require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Handles JSON body parsing (no need for body-parser)
connectDB();

// Routes
app.post("/api/travel", tripController.travelPlanner);
app.post("/api/flights", flightController.searchFlights);
app.get('/api/accommodation/search', accommodation.searchAccommodation); 


// Fallback route for unhandled paths
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
