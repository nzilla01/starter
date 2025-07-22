const express = require('express')
const router = express.Router()
const invController = require('../controllers/invcontroller')
const { validateClassification } = require("../utilities/classification-validation") 
const { validateInventory } = require("../utilities/inventory-validation") 


// View all vehicles by classification
router.get("/type/:classificationId", invController.buildByClassificationId)

// View single vehicle detail
router.get("/detail/:invId", invController.buildDetailView)

// Inventory management dashboard
router.get("/management", invController.getInventoryManagement)


// Show classification form
router.get("/add-classification", invController.buildAddClassification)

// Handle classification form POST
router.post(
  "/add-classification",
  validateClassification,
  invController.insertClassification
)

// Show add inventory form
router.get("/add-inventory", invController.buildAddInventory)

// Handle inventory form POST
router.post(
  "/add-inventory",
  validateInventory,
  invController.insertInventory
)

module.exports = router
