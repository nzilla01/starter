const express = require("express");
const acct = express.Router();
const utilities = require("../utilities"); 
const accountctr = require("../controllers/accountscontroller");
const regValidate = require("../utilities/account-validation");

// Route: GET /account/login
acct.get("/login", utilities.handleErrors(accountctr.buildLogin));

// POST /account/login
acct.post(
  "/login",
  regValidate.loginRules(),
  regValidate.checkLoginData,
  utilities.handleErrors(accountctr.accountLogin)
);

// GET /account/register
acct.get("/register", utilities.handleErrors(accountctr.buildRegister));

// POST /account/register
acct.post(
  "/register",
  regValidate.registrationRules(),
  regValidate.checkRegData,
  utilities.handleErrors(accountctr.registerAccount)
);

// GET /account/logout
acct.get("/logout", utilities.handleErrors(accountctr.logout));

 // GET /account (home dashboard)
acct.get("/",

    utilities.handleErrors(accountctr.buildAccountHome));

// GET /account/update/:account_id (load update form)
acct.get(
  "/update/:account_id",
  utilities.handleErrors(accountctr.buildUpdateAccountView)
);


// POST /account/update (update basic info: name + email)
acct.post(
  "/update",
  regValidate.updateAccountRules(),
  regValidate.checkUpdateAccountData,
  utilities.handleErrors(accountctr.updateAccount)
);

// POST /account/update-password (update password)
acct.post(
  "/update-password",
  regValidate.passwordRules(),
  regValidate.checkPasswordData,
  utilities.handleErrors(accountctr.updatePassword)
);

module.exports = acct;
