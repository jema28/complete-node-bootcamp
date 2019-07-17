const express = require('express')

const router = express.Router()
const {
  getAllTours,
  createTour,
  getTour,
  updateTour,
  deleteTour,
  aliasTopTours
} = require('../controllers/tours')

// router.param('id', checkID)

router.route('/top-5-tours').get(aliasTopTours, getAllTours)

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
