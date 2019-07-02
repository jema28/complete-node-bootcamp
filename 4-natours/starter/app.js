const express = require('express')
// create an instance of express
const app = express()

// GET http method and url
app.get('/', (req, res) => {
  // res.status(200).send('Hello from the server side')
  // automatically sets the content type to json
  res.status(200).json({ message: 'Hello', app: 'Natours' })
})

app.post('/', (req, res) => {
  res.send('You can post to this endpoint')
})

const port = 3000
app.listen(port, () => {
  console.log(`App running on on http://localhost:${port}`)
})
