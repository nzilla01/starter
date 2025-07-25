const express = require("express");
const acct = express.Router();
// const utilities = require("../utilities"); 
const accountctr = require("../controllers/accountscontroller");

// Route: GET /account
acct.get("/login", accountctr.buildLogin);


module.exports = acct;
