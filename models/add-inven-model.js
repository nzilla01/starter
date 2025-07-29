const db = require('../database/')

async function addInventory(data) {
  const sql = `
    INSERT INTO inventory (
      inv_make, inv_model, inv_year, inv_description,
      inv_image, inv_thumbnail, inv_price, inv_miles,
      inv_color, classification_id
    ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
    RETURNING *
  `
  const values = [
    data.inv_make,
    data.inv_model,
    data.inv_year,
    data.inv_description,
    data.inv_image || '/images/no-image.png',
    data.inv_thumbnail || '/images/no-image-thumb.png',
    data.inv_price,
    data.inv_miles,
    data.inv_color,
    data.classification_id
  ]

  try {
    const result = await db.query(sql, values)
    return result.rows[0]
  } catch (err) {
    console.error("Add Inventory DB Error:", err.message)
    return null
  }

}


async function addClassification(classification_name) {
  const sql = `
    INSERT INTO classification (classification_name)
    VALUES ($1)
    RETURNING *;
  `

  try {
    const result = await db.query(sql, [classification_name.trim()])
    return result.rows[0]  // returns the inserted row (id + name)
  } catch (err) {
    console.error("Add Classification DB Error:", err.message)
    return null
  }
}



module.exports ={ addInventory, addClassification }

