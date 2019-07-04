const fs = require('fs')

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
)

exports.checkID = (req, res, next) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    })
  }
  next()
}

// Create a checkBody middleware. Check if body contains the name property and the price property. If not send back 400(bad request)
// Add it to the post handler stack
exports.checkBody = (req, res, next) => {
  const { name, price } = req.body
  if (!name || !price) {
    return res.status(400).json({
      status: 'fail',
      message: 'name and/or price property missing'
    })
  }
  next()
}

exports.getAllTours = (req, res) => {
  console.log(req.requestTime)
  res.json({
    status: 'success',
    results: tours.length,
    data: { tours }
  })
}

exports.getTour = (req, res) => {
  const id = req.params.id * 1
  const tour = tours.find(tour => tour.id === id)
  //
  res.json({
    status: 'success',
    data: { tour }
  })
}

exports.createTour = (req, res) => {
  console.log('req.body', req.body)
  const newId = tours[tours.length - 1].id + 1
  const newTour = Object.assign({ id: newId }, req.body)
  console.log('newTour', newTour)
  tours.push(newTour)

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    err => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour
        }
      })
    }
  )
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
