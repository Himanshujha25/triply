require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const tripController = require("./controllers/tripController");
const cors = require("cors");

const app = express();

// CORS Setup
app.use(cors({
  origin: ["https://triplybycybernexus.vercel.app"],
}));

// Middleware
app.use(express.json());
app.use(bodyParser.json());

// Routes
app.post("/api/travel", tripController.travelPlanner);

// Server Listener
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
