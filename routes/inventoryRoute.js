const express = require('express')
const router = express.Router()
const invController = require('../controllers/invcontroller')
const utilities = require('../utilities/')
const regValidate = require("../utilities/inventory-validation")




// View all vehicles by classification
router.get("/type/:classificationId", invController.buildByClassificationId)

router.get("/detail/:inv_id", invController.buildByInventoryId);// View vehicle details by inventory ID

router.get("/", utilities.handleErrors(invController.buildManagement))

router.get("/add-inventory", invController.buildAddInventory);

router.post("/add-inventory", 
  utilities.checkAccountType,
  regValidate.validateInventory,
   invController.buildAddInventory); 

   router.get("/add-classification",utilities.checkAccountType, utilities.handleErrors(invController.buildAddClassification))


   router.get("/getInventory/:classification_id",  utilities.handleErrors(invController.getInventoryJSON))

   // Route to build edit inventory view
  router.get("/edit/:inv_id",  utilities.handleErrors(invController.editInventoryView))


router.post(
  "/add-classification",
  regValidate.validateInventory,
  utilities.handleErrors(invController.insertClassification)
)

module.exports = router

