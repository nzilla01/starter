const express = require('express')
const router = express.Router()
const invController = require('../controllers/invcontoller')

// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);


router.get("/detail/:invId", invController.buildDetailView);

module.exports = router;