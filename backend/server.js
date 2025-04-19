const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

// Controllers

const accommodation = require('./controllers/accommodation');
const tripController = require("./controllers/tripController");
const flightController = require("./controllers/flightController");
const getPlaceImage = require("./utils/getPlaceImage");

require("dotenv").config();

const app = express();

// Middleware
app.use(cors({
  origin: 'https://triplyv2-himanshujha25s-projects.vercel.app', // Allow only the specified domain
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json()); // Handles JSON body parsing (no need for body-parser)
connectDB();

// Routes

app.get("/", (req, res) => {
  res.send("Triply backend is running 🚀");
});
app.post("/api/travel", tripController.travelPlanner);
app.post("/api/flights", flightController.searchFlights);
app.get('/api/accommodation/search', accommodation.searchAccommodation); 

app.get("/getPlaceImage", async (req, res) => {
  const { destination, days } = req.query;

  if (!destination || !days) {
    return res.status(400).json({ error: "Destination and days required" });
  }

  const images = await getPlaceImage(destination, parseInt(days), process.env.GOOGLE_API_KEY);
  res.json({ images });
});



// Fallback route for unhandled paths
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
