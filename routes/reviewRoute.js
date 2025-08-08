const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/review");
const utilities = require("../utilities");

// Show the add review form
router.get("/add", reviewController.showAddReviewForm);

// Handle review submission
router.post("/add", reviewController.addReview);

module.exports = router;