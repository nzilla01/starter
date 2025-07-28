const express = require("express");
const acct = express.Router();
const utilities = require("../utilities"); 
const accountctr = require("../controllers/accountscontroller");

// Route: GET /account
acct.get("/login", utilities.handleErrors(accountctr.buildLogin))

acct.get("/register", utilities.handleErrors(accountctr.buildRegister));


//post route for registration
acct.post("/register", utilities.handleErrors(accountctr.registerAccount));

module.exports = acct;
