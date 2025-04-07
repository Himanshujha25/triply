const express = require("express");
const { travelPlanner } = require("../controllers/tripController");

const router = express.Router();

// Route to handle trip planning
router.post("/travel", travelPlanner);

module.exports = router;

