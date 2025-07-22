const { body } = require("express-validator")

const validateInventory = [
  body("classification_id").isInt().withMessage("Select a classification."),
  body("inv_make").trim().notEmpty().withMessage("Make is required."),
  body("inv_model").trim().notEmpty().withMessage("Model is required."),
  body("inv_year").isInt({ min: 1900 }).withMessage("Valid year is required."),
  body("inv_description").trim().notEmpty().withMessage("Description required."),
  body("inv_image").trim().notEmpty().withMessage("Image path required."),
  body("inv_thumbnail").trim().notEmpty().withMessage("Thumbnail path required."),
  body("inv_price").isFloat({ gt: 0 }).withMessage("Price must be greater than 0."),
  body("inv_miles").isInt({ min: 0 }).withMessage("Miles must be a positive number."),
  body("inv_color").trim().notEmpty().withMessage("Color is required.")
]

module.exports = { validateInventory }
