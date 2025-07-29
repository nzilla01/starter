const express = require("express");
const acct = express.Router();
const utilities = require("../utilities"); 
const accountctr = require("../controllers/accountscontroller");
const regValidate = require("../utilities/account-validation")

// Route: GET /account
acct.get("/login", utilities.handleErrors(accountctr.buildLogin))


//get /registrattion
acct.get("/register", utilities.handleErrors(accountctr.buildRegister));


//post route for registration
acct.post("/register",
    regValidate.registrationRules(),
     regValidate.checkRegData,
    utilities.handleErrors(accountctr.registerAccount));

module.exports = acct;
