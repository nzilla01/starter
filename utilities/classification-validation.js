const { body } = require("express-validator")

const validateClassification = [
  body("classification_name")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Classification name is required.")
    .matches(/^[A-Za-z0-9]+$/)
    .withMessage("Only letters and numbers allowed — no spaces or special characters."),
]

module.exports = { validateClassification }
