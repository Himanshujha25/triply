const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const  accommodation  = require('./controllers/accommodation');

const bodyParser = require("body-parser");
require("dotenv").config();

const tripController = require("./controllers/tripController");
const flightController = require("./controllers/flightController");

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
connectDB(); 

app.post("/api/travel", tripController.travelPlanner);
app.post("/api/flights", flightController.searchFlights);
app.get('/api/accommodation/search',accommodation.searchAccommodation); 


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
