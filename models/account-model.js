const pool = require('../database/')


/* ****************************************
*  Register a new account
* *************************************** */


async function registerAccount(firstname, lastname, email, password) {
    try{
        const sql = "INSERT INTO account(account_firstname, account_lastname, account_email, account_password) VALUES ($1, $2, $3, $4 'client') RETURNING *";
        return await pool.query(sql, [account_firstname, account_lastname, account_email, account_password]);
    } catch (error) {
        return error.message
    }
    }

    module.exports = { registerAccount };