require("dotenv").config(); // Load .env variables
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const tripController = require("./controllers/tripController");

const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use(bodyParser.json());

// API Route
app.post("/api/travel", tripController.travelPlanner);

// Server listen
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
