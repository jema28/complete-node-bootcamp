const express = require('express')

const router = express.Router()
const { getAllReviews, createReview } = require('../controllers/reviews')
const { protect, restrictTo } = require('../controllers/auth')

router
  .route('/')
  .get(getAllReviews)
  .post(protect, restrictTo('user'), createReview)

module.exports = router
