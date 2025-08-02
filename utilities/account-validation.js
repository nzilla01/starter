const utilities = require("./index")
const {body, validationResult} = require("express-validator")


const validate = {}

/* ****************************************
*  registratio data validation rules
* *************************************** */



validate.registrationRules = () => {
    return[
        // first name is required and must be a string
        body("account_firstname")
        .trim()
        .escape()
        .notEmpty()
        .isLength({min: 1})
        .withMessage("Please provide a first name."),// on error message sent

        // last name is required and must be a string
        body("account_lastname")
        .trim()
        .escape()
        .notEmpty()
        .isLength({min: 2})
        .withMessage("Please provide a last name."),// on error message sent

        //valid email address is required
        body("account_email")
        .trim()
        .escape()
        .notEmpty()
        .isEmail()
        .normalizeEmail()
        .withMessage("Please provide a valid email address."),// on error message sent

        // password is required and must be at least 12 characters long

        body("account_password")
        .trim()
        .notEmpty()
        .isStrongPassword({
        minLength: 12,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
        })
        .withMessage("Password does not meet requirements. It must be at least 12 characters long and include at least one lowercase letter, one uppercase letter, one number, and one symbol.")

    ]
}



/* ****************************************
* Check data and return errors or continue to registration
* *************************************** */
validate.checkRegData = async (req, res, next) => {
    const {account_firstname, account_lastname, account_email} = req.body
    let errors = []
    errors = validationResult(req)
    if (!errors.isEmpty()) {
       let nav = await utilities.getNav()
       res.render("account/register", {
        errors,
        title: "Registration",
        nav,
        account_firstname,
        account_lastname,
        account_email,
       })

       return
    }

        next()
    }


    /* ****************************************
*  Login data validation rules
* **************************************** */
validate.loginRules = () => {
  return [
    // valid email address is required
    body("account_email")
      .trim()
      .escape()
      .notEmpty()
      .isEmail()
      .normalizeEmail()
      .withMessage("Please provide a valid email address."),

    // password is required
    body("account_password")
      .trim()
      .notEmpty()
      .withMessage("Please provide a password.")
  ]
}

/* ****************************************
* Check login data and return errors or continue
* **************************************** */
validate.checkLoginData = async (req, res, next) => {
  const { account_email } = req.body
  let errors = validationResult(req)

  if (!errors.isEmpty()) {
    let nav = await utilities.getNav()
    res.render("account/login", {
      errors,
      title: "Login",
      nav,
      account_email,
    })
    return
  }

  next()
}

/* ****************************************
* Update account info validation rules
* **************************************** */
validate.updateAccountRules = () => {
  return [
    body("account_firstname")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 1 })
      .withMessage("Please provide a first name."),

    body("account_lastname")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 1 })
      .withMessage("Please provide a last name."),

    body("account_email")
      .trim()
      .escape()
      .notEmpty()
      .isEmail()
      .normalizeEmail()
      .withMessage("Please enter a valid email address."),
  ]
}

/* ****************************************
* Check update account data
* **************************************** */
validate.checkUpdateAccountData = async (req, res, next) => {
  const { account_firstname, account_lastname, account_email, account_id } = req.body
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    let nav = await utilities.getNav()
    res.render("account/update", {
      errors,
      title: "Edit Account",
      nav,
      account_firstname,
      account_lastname,
      account_email,
      account_id
    })
    return
  }

  next()
}

/* ****************************************
* Password update validation rules
* **************************************** */
validate.passwordRules = () => {
  return [
    body("account_password")
      .trim()
      .notEmpty()
      .isStrongPassword({
        minLength: 12,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
      })
      .withMessage("Password must be at least 12 characters long and include at least one lowercase letter, one uppercase letter, one number, and one symbol.")
  ]
}

/* ****************************************
* Check password update data
* **************************************** */
validate.checkPasswordData = async (req, res, next) => {
  const { account_id } = req.body
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    let nav = await utilities.getNav()
    res.render("account/update", {
      errors,
      title: "Edit Account",
      nav,
      account_id
    })
    return
  }

  next()
}




module.exports = validate