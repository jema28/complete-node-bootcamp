const express = require('express')

const router = express.Router()
const {
  getAllTours,
  createTour,
  getTour,
  updateTour,
  deleteTour,
  aliasTopTours,
  getTourStats,
  getMonthlyPlan
} = require('../controllers/tours')
const { protect, restrictTo } = require('../controllers/auth')

// router.param('id', checkID)

router.route('/top-5-tours').get(aliasTopTours, getAllTours)
router.route('/tour-stats').get(getTourStats)
router.route('/monthly-plan/:year').get(getMonthlyPlan)

router
  .route('/')
  .get(protect, getAllTours)
  .post(createTour)

router
  .route('/:id')
  .get(getTour)
  .patch(updateTour)

  .delete(protect, restrictTo('admin', 'lead-guide'), deleteTour)

module.exports = router
