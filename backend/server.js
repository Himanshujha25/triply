require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const tripController = require("./controllers/tripController");
const cors = require('cors');

// const connectDB = require("./config/db"); // Uncomment if using MongoDB

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());

// connectDB(); // Uncomment if using MongoDB
app.use(bodyParser.json());

// Route
app.use("/api/travel", tripController.travelPlanner);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
