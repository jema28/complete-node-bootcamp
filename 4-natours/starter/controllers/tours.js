const Tour = require('../models/tours')

exports.getAllTours = (req, res) => {
  console.log(req.requestTime)
  res.json({
    status: 'success',
    // results: tours.length,
    // data: { tours }
  })
}

exports.getTour = (req, res) => {
  const id = req.params.id * 1
  // const tour = tours.find(tour => tour.id === id)
  //
  // res.json({
  //   status: 'success',
  //   data: { tour }
  // })
}

exports.createTour = (req, res) => {
  res.status(201).json({
    status: 'success',
    // data: {
    //   tour: newTour
    // }
  })
}

exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour>'
    }
  })
}

exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null
  })
}
