const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")
const inventoryModels = require('../models/add-inven-model')

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  const nav = await utilities.getNav()
  const accountData = res.locals.accountData
  const className = data[0]?.classification_name || "Unknown"
  res.render("./inventory/classification", {
    title: `${className} vehicles`,
    nav,
    grid,
    login: accountData
  })
}

/* ***************************
 *  Build inventory detail view
 * ************************** */
invCont.buildByInventoryId = async function (req, res, next) {
  const inv_id = parseInt(req.params.inv_id)
  const nav = await utilities.getNav()
  const accountData = res.locals.accountData
  try {
    const data = await invModel.getInventoryById(inv_id)
    const vehicleName = `${data.inv_make} ${data.inv_model}`
    const html = await utilities.buildDetailView(data)
    res.render("./inventory/detail", {
      title: vehicleName,
      nav,
      login: accountData,
      view: html,
    })
  } catch (error) {
    next(error)
  }
}

/* ***************************
 *  Build management view
 * ************************** */
invCont.buildManagement = async function (req, res) {
  const nav = await utilities.getNav()
  const classificationSelect = await utilities.buildClassificationList()
  const accountData = res.locals.accountData
  res.render("inventory/management", {
    title: "Inventory Management",
    nav,
    login: accountData,
    message: req.flash("message"),
    classificationSelect,
  })
}

/* ***************************
 *  Build Add Classification View
 * ************************** */
invCont.buildAddClassification = async function (req, res) {
  const nav = await utilities.getNav()
  const accountData = res.locals.accountData
  res.render("inventory/add-classification", {
    title: "Add New Classification",
    login: accountData,
    nav,
    message: req.flash("message"),
  })
}

/* ***************************
 *  Insert Classification Process
 * ************************** */
invCont.insertClassification = async function (req, res) {
  const { classification_name } = req.body
  const result = await inventoryModels.addClassification(classification_name)
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

/* ***************************
 *  Build Add Inventory View
 * ************************** */
invCont.buildAddInventory = async function (req, res) {
  let nav = await utilities.getNav()
  let classificationList = await utilities.buildClassificationList()
  const accountData = res.locals.accountData

  res.render("inventory/add-inventory", {
    title: "Add New Inventory",
    nav,
    classificationList,  // this is a full <select> element as HTML string
    errors: null,
     message: null,
     login: accountData,
    classification_id: "",
    inv_make: "",
    inv_model: "",
    inv_year: "",
    inv_description: "",
    inv_image: "",
    inv_thumbnail: "",
    inv_price: "",
    inv_miles: "",
    inv_color: "",
  })
}




/* ***************************
 *  Insert Inventory Process
 * ************************** */
invCont.insertInventory = async function (req, res) {
  const {
    inv_make, inv_model, inv_year, inv_description,
    inv_image, inv_thumbnail, inv_price, inv_miles,
    inv_color, classification_id
  } = req.body

  const result = await inventoryModels.addInventory({
    inv_make,
    inv_model,
    inv_year: parseInt(inv_year),
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price: parseFloat(inv_price),
    inv_miles: parseInt(inv_miles),
    inv_color,
    classification_id: parseInt(classification_id),
  })

  if (result) {
    req.flash("message", "Inventory added successfully.")
    res.redirect("/inv")
  } else {
    req.flash("message", "Failed to add inventory.")
    res.status(500).render("inventory/add-inventory", {
      title: "Add New Inventory",
      nav: await utilities.getNav(),
      classifications: await invModel.getClassifications(),
      message: req.flash("message"),
    })
  }
}


/* ***************************
 *  Return Inventory by Classification As JSON
 * ************************** */
invCont.getInventoryJSON = async (req, res, next) => {
  const classification_id = parseInt(req.params.classification_id)
  const invData = await invModel.getInventoryByClassificationId(classification_id)
  if (invData[0].inv_id) {
    return res.json(invData)
  } else {
    next(new Error("No data returned"))
  }
}

/* ***************************
 *  Build edit inventory view
 * ************************** */
invCont.editInventoryView = async function (req, res, next) {
  const inv_id = parseInt(req.params.inv_id)
  let nav = await utilities.getNav()
  const itemData = await invModel.getInventoryById(inv_id)
  const classificationSelect = await utilities.buildClassificationList(itemData.classification_id)
  const itemName = `${itemData.inv_make} ${itemData.inv_model}`
  const accountData = res.locals.accountData
  res.render("./inventory/edit-inventory", {
    title: "Edit " + itemName,
    nav,
    login: accountData,
    classificationSelect: classificationSelect,
    errors: null,
    inv_id: itemData.inv_id,
    inv_make: itemData.inv_make,
    inv_model: itemData.inv_model,
    inv_year: itemData.inv_year,
    inv_description: itemData.inv_description,
    inv_image: itemData.inv_image,
    inv_thumbnail: itemData.inv_thumbnail,
    inv_price: itemData.inv_price,
    inv_miles: itemData.inv_miles,
    inv_color: itemData.inv_color,
    classification_id: itemData.classification_id
  })
}


module.exports = invCont
