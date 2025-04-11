const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const tripController = require("./controllers/tripController");
const flightController = require("./controllers/flightController");

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.post("/api/travel", tripController.travelPlanner);
app.post("/api/flights", flightController.searchFlights);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
