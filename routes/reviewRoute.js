const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/review"); // make sure filename matches
const utilities = require("../utilities");

router.post("/add", reviewController.addReview);

module.exports = router;
