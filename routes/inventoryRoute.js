const express = require('express')
const router = new express.Router()
const invController = require('../controllers/invcontroller')

// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);

router.get("/cause-error", (req, res, next) => {
  throw new Error("Intentional 500 Error");
});


module.exports = router;