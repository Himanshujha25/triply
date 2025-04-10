require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const tripController = require("./controllers/tripController");

const app = express();

// CORS Setup
app.use(cors({
  origin: ["https://triplybycybernexus.vercel.app"]
}));

// Middleware
app.use(express.json());
app.use(bodyParser.json());

// Environment key check
if (!process.env.OPENROUTER_API_KEY) {
  console.error("❌ OPENROUTER_API_KEY is not defined in .env");
  process.exit(1);
}

// Route
app.post("/api/travel", tripController.travelPlanner);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
