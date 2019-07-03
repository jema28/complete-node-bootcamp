const express = require('express')
const fs = require('fs')

const app = express()

app.use(express.json())

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
)

const getAllTours = (req, res) => {
  res.json({
    status: 'success',
    results: tours.length,
    data: { tours }
  })
}

const getTour = (req, res) => {
  const id = req.params.id * 1
  const tour = tours.find(tour => tour.id === id)

  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    })
  }
  res.json({
    status: 'success',
    data: { tour }
  })
}

const createTour = (req, res) => {
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

const updateTour = (req, res) => {
  if (!req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    })
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour>'
    }
  })
}

const deleteTour = (req, res) => {
  if (!req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    })
  } // 204 means no content / we send data null
  res.status(204).json({
    status: 'success',
    data: null
  })
}

// we can chain requests
app
  .route('/api/v1/tours')
  .get(getAllTours)
  .post(createTour)

app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour)

const port = 3000

app.listen(port, () => {
  console.log(`App running on on http://localhost:${port}`)
})
