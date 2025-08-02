const utilities = require('../utilities')

const baseController = {}

baseController.buildHome = async function(req, res) {
  const nav = await utilities.getNav()
  const accountData = res.locals.accountData || null
  const loggedin = res.locals.loggedin || false

  req.flash("notice", "this is a flash message")
  res.render('index', {
    title: 'Home',
    nav,
    accountData,
    login:accountData
  })
}

module.exports = baseController
