const express = require('express')
const router = express.Router()
const invController = require('../controllers/invcontroller')



// View all vehicles by classification
router.get("/type/:classificationId", invController.buildByClassificationId)

router.get("/detail/:inv_id", invController.buildByInventoryId);// View vehicle details by inventory ID


module.exports = router
