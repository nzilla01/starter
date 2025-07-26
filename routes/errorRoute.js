// routes/errorRoute.js

const express = require('express');
const router = express.Router();
const errorController = require('../controllers/errorController');

// Route to trigger 500 error using controller
router.get('/trigger500', errorController.trigger500);

module.exports = router;
