const reviewModel = require("../models/review-model");
const utilities = require("../utilities/");

async function showAddReviewForm(req, res) {
  const invId = req.query.invId;
  const nav = await utilities.getNav();
  res.render("review-add", {
    title: "Add Review",
    nav,
    invId
  });
}

async function addReview(req, res) {
  const { reviewText, reviewRating, invId } = req.body;
  const accountId = res.locals.accountData.account_id;
  try {
    await reviewModel.addReview(reviewText, reviewRating, invId, accountId);
    req.flash("notice", "Review added successfully.");
    res.redirect(`/inv/detail/${invId}`);
  } catch (error) {
    req.flash("notice", "Error adding review.");
    res.redirect(`/inv/detail/${invId}`);
  }
}

module.exports = { showAddReviewForm, addReview };