const pool = require("../database/")

async function getClassifications() {
  try {
    const data = await pool.query(
      "SELECT * FROM classification ORDER BY classification_name"
    )
    return data.rows
  } catch (error) {
    console.error("getClassifications error: " + error)
    throw error // Re-throw to be caught by controller
  }
}

async function getInventoryByClassificationId(classification_id) {
  try {
    const data = await pool.query(
      `SELECT * FROM public.inventory AS i 
      JOIN public.classification AS c 
      ON i.classification_id = c.classification_id 
      WHERE i.classification_id = $1`,
      [classification_id]
    )
    return data.rows
  } catch (error) {
    console.error("getclassificationsbyid error " + error)
    throw error
  }
}

// NEW FUNCTION FOR DETAIL VIEW
async function getVehicleById(inv_id) {
  try {
    const data = await pool.query(
      `SELECT * FROM inventory 
       WHERE inv_id = $1`,
      [inv_id]
    )
    return data.rows[0] // Return single vehicle
  } catch (error) {
    console.error("getVehicleById error: " + error)
    throw error
  }
}

module.exports = { 
  getClassifications, 
  getInventoryByClassificationId,
  getVehicleById // Export the new function
}