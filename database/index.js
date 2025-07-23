const { Pool } = require('pg'); // PostgreSQL client
require('dotenv').config();     // Load .env variables

/* *******************************
 * Pool Setup
 * Uses SSL in development (like Render, etc.)
 * No SSL in production (e.g., localhost)
 * Exports a unified db.query method for both
 *********************************/

let pool;

if (process.env.NODE_ENV == 'development') {
  console.log(' Environment: DEVELOPMENT');

  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  console.log('✅ Pool created with SSL for development');

  module.exports = {
    async query(text, params) {
      try {
        const res = await pool.query(text, params);
        console.log(' excuted query', {text});
        return res;
      } catch (error) {
        console.error(' Query error:', error.message);
        throw error;
      }
    },
  };
} else {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  })
  module.exports = pool
}
