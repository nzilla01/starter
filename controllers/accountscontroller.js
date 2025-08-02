// controllers/accountController.js

const utilities = require("../utilities");
const accountModel = require("../models/account-model");
const jwt = require("jsonwebtoken")
require("dotenv").config()
const bcrypt = require("bcryptjs");



/* ****************************************
*  Deliver login view
* *************************************** */
async function buildLogin(req, res, next) {
  let nav = await utilities.getNav();
  const accountData = res.locals.accountData
  res.render("account/login", {
    title: "Login",
    nav,
    login: accountData
  });
  

}

/* ****************************************
 *  Process login request
 * ************************************ */
async function accountLogin(req, res) {
  let nav = await utilities.getNav()
  const { account_email, account_password } = req.body
  const accountData = await accountModel.getAccountByEmail(account_email)
 console.log("🧠 Fetched account data:", accountData);


  if (!accountData) {
    req.flash("notice", "Please check your credentials and try again.")
    res.status(400).render("account/login", {
      title: "Login",
      nav,
      errors: null,
      account_email,
    })
    return
  }
  try {
    if (await bcrypt.compare(account_password, accountData.account_password)) {
      delete accountData.account_password
      const accessToken = jwt.sign(accountData, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 3600 * 1000 })
      if(process.env.NODE_ENV === 'development') {
        res.cookie("jwt", accessToken, { httpOnly: true, maxAge: 3600 * 1000 })
      } else {
        res.cookie("jwt", accessToken, { httpOnly: true, secure: true, maxAge: 3600 * 1000 })
      }
      req.flash('notice', 'successfull')
      return res.redirect("/account")
    }
    else {
      req.flash("message notice", "Please check your credentials and try again.")
      res.status(400).render("account/login", {
        title: "Login",
        nav,
        errors: null,
        account_email,
      })
    }
  } catch (error) {
    throw new Error('Access Forbidden')
  }
}

/* ****************************************
*  Deliver registration view
* *************************************** */
async function buildRegister(req, res, next) {
  let nav = await utilities.getNav();
  const accountData = res.locals.accountData
  res.render("account/register", {
    title: "Register",
    nav,
    errors:null,
    login: accountData
  });
}


/* ****************************************
*  Process Registration
* *************************************** */
async function registerAccount(req, res) {
  let nav = await utilities.getNav()
  const { account_firstname, account_lastname, account_email, account_password } = req.body
  const hashedPassword = await bcrypt.hash(account_password, 12)
  const regResult = await accountModel.registerAccount(
    account_firstname,
    account_lastname,
    account_email,
    hashedPassword
  )
  
  if (regResult) {
    req.flash(
      "notice",
      `Congratulations, you\'re registered ${account_firstname}. Please log in.`
    )
    res.status(201).render("account/login", {
      title: "Login",
      nav,
    })
  } else {
    req.flash("notice", "Sorry, the registration failed.")
    res.status(501).render("account/register", {
      title: "Registration",
      nav,
    })
  }
}

/************************************ 
 * acount page 
**********************************/
async function buildAccountHome(req, res) {
  const nav = await utilities.getNav()
  const accountData = res.locals.accountData
  res.render("index", {
    title: "Account Home",
    nav,
    login :accountData
  })
}

/*****************
 * account logout
 ***************/

async function logout(req, res) {
  res.clearCookie("jwt", {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: "Strict"
  })
  req.flash("notice", "You have been logged out.")
  res.redirect("/")
}

// Deliver update view
async function buildUpdateAccountView(req, res) {
  const account_id = parseInt(req.params.account_id);
  const nav = await utilities.getNav();
  const data = res.locals.accountData
  const accountData = await accountModel.getAccountById(account_id);
  res.render("account/update", {
    title: "Update Account",
    nav,
    errors: null,
    account_id: accountData.account_id,
    account_firstname: accountData.account_firstname,
    account_lastname: accountData.account_lastname,
    account_email: accountData.account_email,
    login: data
  });
}

// Process update of first/last name and email
async function updateAccount(req, res) {
  const { account_id, account_firstname, account_lastname, account_email } = req.body;
  const nav = await utilities.getNav();

  const updateResult = await accountModel.updateAccountInfo(
    account_id,
    account_firstname,
    account_lastname,
    account_email
  );

  if (updateResult) {
    req.flash("notice", "Account info updated successfully.");
    return res.redirect("/account/");
  } else {
    req.flash("notice", "Update failed.");
    return res.status(501).render("account/update", {
      title: "Update Account",
      nav,
      account_id,
      account_firstname,
      account_lastname,
      account_email,
      errors: null
    });
  }
}

// Process password update
async function updatePassword(req, res) {
  const { account_id, account_password } = req.body;
  const nav = await utilities.getNav();

  try {
    const hashedPassword = await bcrypt.hash(account_password, 10);
    const result = await accountModel.updatePassword(account_id, hashedPassword);

    if (result) {
      req.flash("notice", "Password updated successfully.");
      res.redirect("/account/");
    } else {
      req.flash("notice", "Password update failed.");
      res.redirect(`/account/update/${account_id}`);
    }
  } catch (error) {
    req.flash("notice", "Error processing password.");
    res.redirect(`/account/update/${account_id}`);
  }
}



module.exports = {
  buildLogin,
  registerAccount,
  buildAccountHome,
  logout,
  buildRegister,
  accountLogin,
  buildUpdateAccountView,
  updateAccount,
  updatePassword
};
