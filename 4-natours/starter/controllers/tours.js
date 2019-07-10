const Tour = require('../models/tours')

exports.getAllTours = (req, res) => {
  console.log(req.requestTime)
  res.json({
    status: 'success'
    // results: tours.length,
    // data: { tours }
  })
}

exports.getTour = (req, res) => {
  // const tour = tours.find(tour => tour.id === id)
  //
  // res.json({
  //   status: 'success',
  //   data: { tour }
  // })
}

exports.createTour = async (req, res) => {
  // another way of creating a new instance
  // use the Tour model directly and call the create method on it.
  // in that function we pass the data we want to store in the database (from the request.body)
  // this create method returns a promise which we save in async await / store this in newTour variable
  //
  // we have a try catch because we're using an async await function
  try {
    const newTour = await Tour.create(req.body)

    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour
      }
    })
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      // using this for now but will do proper error handling later
      message: 'Invalid data sent'
    })
  }
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
