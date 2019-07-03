const express = require('express')
const fs = require('fs')

const app = express()

// middleware is a function that can modify the incoming request data - stands in the middle of the request and the response
app.use(express.json())

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
)

app.get('/api/v1/tours', (req, res) => {
  res.json({
    status: 'success',
    results: tours.length,
    data: { tours }
  })
})

// variable starting with colon
app.get('/api/v1/tours/:id', (req, res) => {
  // req.params is the place where all the variables that we define are stored (parameters) - can do multiple
  // can create an optional param by adding ? after the variable `:y?` (maybe could be before)
  const id = req.params.id * 1
  const tour = tours.find(tour => tour.id === id)

  // can't find id for that tour
  // if (id > tours.length)
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
})

// the way we send data from the client to the server. This data is available on the request. The request object holds all the information about the request including data that was sent. In order to have get this data, we have to use something called middleware.
app.post('/api/v1/tours', (req, res) => {
  console.log('req.body', req.body)
  const newId = tours[tours.length - 1].id + 1
  // create a new object by merging two objects existing objects together
  const newTour = Object.assign({ id: newId }, req.body)
  console.log('newTour', newTour)
  tours.push(newTour)

  // now we want to persist this data into our simple JSON tour file
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    err => {
      // status 201 stands for created - created a new resource on the server
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour
        }
      })
    }
  )
})

const port = 3000

app.listen(port, () => {
  console.log(`App running on on http://localhost:${port}`)
})
