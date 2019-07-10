const mongoose = require('mongoose')
const env = require('dotenv')
const app = require('./app')

env.config({ path: './config.env' })

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
)
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log('DB connection successful'))

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    // validator
    required: [true, 'Name is required'],
    unique: true
  },
  rating: Number,
  price: {
    type: Number,
    require: [true, 'A tour must have a price']
  }
})

// convention of using model names and variables
const Tour = mongoose.model('Tour', tourSchema)

const testTour = new Tour({
  name: 'The Park Camper',
  price: 997
})

testTour
  .save()
  .then(document => console.log(document))
  .catch(error => console.log(error))

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`App running on on http://localhost:${port}`)
})
