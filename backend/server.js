const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

// Controllers

const accommodation = require('./controllers/accommodation');
const tripController = require("./controllers/tripController");
const flightController = require("./controllers/flightController");
// Check this line in your server.js
const getPlaceImages = require("./utils/getPlaceImage");

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

app.get("/api/getPlaceImage", async (req, res) => {
  const { destination, days } = req.query;

  // Check if destination or days are missing
  if (!destination || !days) {
    return res.status(400).json({ error: "Destination and days are required" });
  }

  try {
    // Fetch images using getPlaceImage
    const images = await getPlaceImages(destination, parseInt(days), process.env.GOOGLE_API_KEY);

    // Check if no images were found
    if (!images || images.length === 0) {
      return res.status(404).json({ error: "No images found for the destination" });
    }

    // Send the images back as a response
    res.json({ images });
  } catch (error) {
    // Log the error and send a generic error message
    console.error("Error fetching images:", error);
    res.status(500).json({ error: "Internal server error while fetching images" });
  }
});



// Fallback route for unhandled paths
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
