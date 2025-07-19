
const express = require('express')
const router = express.Router()

// Route to trigger 500 error
router.get("/trigger500", (req, res, next) => {
  throw new Error("Intentional 500 Error")
})

module.exports = router