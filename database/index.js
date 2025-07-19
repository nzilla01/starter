const {Pool} = require('pg') // Importing the pool functionality pg
require('dotenv').config()
/* *************************
*connect pool
* SSL Object needed for local testing of app
* But will cause problems in production environment
* If - else will make determination which to use
* *************** */

let pool
  if (process.env.NODE_ENV === 'development') {pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  })   
  
  //added for troubleshooting query errors during development
  module.exports = {
    async query(text, params) {
        try{
            const res = await pool.query(text, params)
            return res
        }catch (err) {
            console.error('Query error:', err)
            throw err
        }

        }
    }
}else {
    pool = new pool({
        connectionString: process.env.DATABASE_URL,
    })
    module.exports = pool
}