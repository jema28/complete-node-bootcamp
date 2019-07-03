const express = require('express')
const router = express.Router()
const {
  getAllTours,
  createTour,
  getTour,
  updateTour,
  deleteTour,
  checkID
} = require('../controllers/tours')

// this middleware if now part of our pipeline
router.param('id', checkID)

router
  .route('/')
  .get(getAllTours)
  .post(createTour)

router
  .route('/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour)

module.exports = router
