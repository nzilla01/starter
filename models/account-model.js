const pool = require('../database/')


/* ****************************************
*  Register a new account
* *************************************** */


async function registerAccount(account_firstname, account_lastname, account_email, account_password) {
    try{
        const sql = "INSERT INTO account(account_firstname, account_lastname, account_email, account_password) VALUES ($1, $2, $3, $4) RETURNING *";
        return await pool.query(sql, [account_firstname, account_lastname, account_email, account_password]);
    } catch (error) {
        return error.message
    }
    }



    /* *****************************
* Return account data using email address
* ***************************** */
async function getAccountByEmail (account_email) {
  try {
    const result = await pool.query(
      'SELECT account_id, account_firstname, account_lastname, account_email, account_type, account_password FROM account WHERE account_email = $1',
      [account_email])
    return result.rows[0]
  } catch (error) {
    return new Error("No matching email found")
  }
}


// Get account by ID
async function getAccountById(account_id) {
  try {
    const result = await pool.query(
      `SELECT * FROM public.account WHERE account_id = $1`,
      [account_id]
    );
    return result.rows[0];
  } catch (error) {
    console.error("getAccountById error", error);
  }
}

// Update account info
async function updateAccountInfo(account_id, firstname, lastname, email) {
  try {
    const sql = `
      UPDATE public.account
      SET account_firstname = $1,
          account_lastname = $2,
          account_email = $3
      WHERE account_id = $4
      RETURNING *;
    `;
    const result = await pool.query(sql, [firstname, lastname, email, account_id]);
    return result.rows.length;
  } catch (error) {
    console.error("updateAccountInfo error", error);
  }
}

// Update password
async function updatePassword(account_id, hashedPassword) {
  try {
    const sql = `
      UPDATE public.account
      SET account_password = $1
      WHERE account_id = $2
    `;
    const result = await pool.query(sql, [hashedPassword, account_id]);
    return result.rowCount;
  } catch (error) {
    console.error("updatePassword error", error);
  }
}




    module.exports = { registerAccount,   updatePassword, getAccountByEmail, getAccountById, updateAccountInfo };