const pool = require("../database/")

// Get all classifications
async function getClassifications() {
  try {
    const data = await pool.query(
      "SELECT * FROM classification ORDER BY classification_name"
    )
    return data.rows
  } catch (error) {
    console.error("getClassifications error: " + error)
    throw error
  }
}

// Get inventory by classification ID
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

// Get vehicle details by ID
async function getVehicleById(inv_id) {
  try {
    const data = await pool.query(
      `SELECT * FROM inventory 
       WHERE inv_id = $1`,
      [inv_id]
    )
    return data.rows[0]
  } catch (error) {
    console.error("getVehicleById error: " + error)
    throw error
  }
}

// ✅ Add new classification
async function addClassification(classification_name) {
  try {
    const sql = `
      INSERT INTO classification (classification_name)
      VALUES ($1)
      RETURNING *;
    `
    const result = await pool.query(sql, [classification_name])
    return result.rows[0] // Return the newly inserted row
  } catch (error) {
    console.error("addClassification error: " + error)
    throw error
  }
}

module.exports = { 
  getClassifications, 
  getInventoryByClassificationId,
  getVehicleById,
  addClassification // Export the new function
}
