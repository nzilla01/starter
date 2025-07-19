async function getVehicleById(invId) {
  const sql = `
    SELECT * FROM inventory AS i 
    JOIN classification AS c 
    ON i.classification_id = c.classification_id 
    WHERE i.inv_id = $1
  `;
  const data = await pool.query(sql, [invId]);
  return data.rows[0];
}
