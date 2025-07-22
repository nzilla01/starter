const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}
/* ***************************
 * Build add-classification view
 * ************************** */
invCont.buildAddClassification = async (req, res) => {
  let nav = await utilities.getNav();
  res.render("./inventory/add-classification", {
    title: "Add New Classification",
    nav,
    errors: null,
  });
};

/* ***************************
 * Process classification addition
 * ************************** */
invCont.insertClassification = async (req, res) => {
  // Add your logic to insert classification into DB
  // Example:
  const { classification_name } = req.body;
  try {
    await invModel.addClassification(classification_name);
    req.flash("message", "Classification added successfully!");
    res.redirect("/inventory/management");
  } catch (error) {
    let nav = await utilities.getNav();
    res.render("./inventory/add-classification", {
      title: "Add New Classification",
      nav,
      errors: [error.message],
    });
  }
};

/* ***************************
 * Build add-inventory view
 * ************************** */
invCont.buildAddInventory = async (req, res) => {
  let nav = await utilities.getNav();
  const classifications = await invModel.getClassifications();
  res.render("./inventory/add-inventory", {
    title: "Add New Vehicle",
    nav,
    classifications,
    errors: null,
  });
};

/* ***************************
 * Process inventory addition
 * ************************** */
invCont.insertInventory = async (req, res) => {
  // Add your logic to insert inventory into DB
  try {
    await invModel.addInventory(req.body);
    req.flash("message", "Vehicle added successfully!");
    res.redirect("/inventory/management");
  } catch (error) {
    let nav = await utilities.getNav();
    const classifications = await invModel.getClassifications();
    res.render("./inventory/add-inventory", {
      title: "Add New Vehicle",
      nav,
      classifications,
      errors: [error.message],
    });
  }
};

module.exports = invCont