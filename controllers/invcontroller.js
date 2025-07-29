const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")
const addInventory = require('../models/add-inven-model')

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  })
}

/* ***************************
 *  Build inventory detail view
 * ************************** */
invCont.buildByInventoryId = async function (req, res, next) {
  const inv_id = parseInt(req.params.inv_id)
  let nav = await utilities.getNav()
  try {
    const data = await invModel.getInventoryById(inv_id)
    const vehicleName = `${data.inv_make} ${data.inv_model}`
    const html = await utilities.buildDetailView(data)
    res.render("./inventory/detail", {
      title: vehicleName,
      nav,
      view : html,
    })
  } catch (error) {
    next(error)
  }
}

/* ***************************
 *  Build managment system
 * ************************** */
invCont.buildManagement = async function (req, res) {
  let nav = await utilities.getNav()
  res.render("inventory/management", {
    title: "Inventory Management",
    nav,
    message: req.flash("message"),
  })
}

/* ***************************
 *  addClassification
 * ************************** */

invCont.buildAddClassification = async function (req, res) {
  let nav = await utilities.getNav()
  res.render("inventory/add-classification", {
    title: "Add New Classification",
    nav,
    message: req.flash("message"),
  })
}

/* ***************************
 *  insertClassification
 * ************************** */

invCont.insertClassification = async function (req, res) {
  const { classification_name } = req.body
  const result = await invModel.addClassification(classification_name)

  if (result) {
    req.flash("message", "Classification added successfully.")
    res.redirect("/inv")
  } else {
    req.flash("message", "Failed to add classification.")
    res.status(500).render("inventory/add-classification", {
      title: "Add New Classification",
      nav: await utilities.getNav(),
      message: req.flash("message"),
      classification_name,
    })
  }
}



module.exports = invCont
