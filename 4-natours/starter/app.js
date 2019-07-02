const express = require('express')
const app = express()

const fs = require('fs')

// 2 - readFileSync
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
)

// we should always specfiy the version of the API. You can also do it in the subdomain.
// route handler
// tours is the resource
app.get('/api/v1/tours', (req, res) => {
  res.json({
    // using jssend specification
    status: 'success',
    // include result number when response is an array - makes it easy for the client to get key information
    results: tours.length,
    // envelope for our data
    data: { tours }
  })
})

const port = 3000

app.listen(port, () => {
  console.log(`App running on on http://localhost:${port}`)
})
