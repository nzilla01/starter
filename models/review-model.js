const pool = require("../database/");

async function addReview(reviewText, reviewRating, invId, accountId) {
  try {
    const sql = `INSERT INTO review (review_text, review_rating, inv_id, account_id) VALUES ($1, $2, $3, $4)`;
    await pool.query(sql, [reviewText, reviewRating, invId, accountId]);
  } catch (error) {
    throw error;
  }
}

async function getReviewsByInventoryId(invId) {
  const sql = `SELECT r.review_text, r.review_rating, r.review_date, a.account_firstname
               FROM review r
               JOIN account a ON r.account_id = a.account_id
               WHERE inv_id = $1 ORDER BY review_date DESC`;
  const result = await pool.query(sql, [invId]);
  return result.rows;
}

module.exports = { addReview, getReviewsByInventoryId };
