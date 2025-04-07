require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const tripController = require("./controllers/tripController.js");  // Fixed the path to tripController
const connectDB = require("./config/db.js");  // Fixed the path to db.js
const app = express();
connectDB();  // Connect to MongoDB
// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Define the route for travel planning
app.use("/api/travel", tripController.travelPlanner);  // Changed the route to /api

// Server setup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
