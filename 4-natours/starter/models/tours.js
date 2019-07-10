const mongoose = require('mongoose')

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    unique: true
  },
  rating: Number,
  price: {
    type: Number,
    require: [true, 'A tour must have a price']
  }
})

const Tour = mongoose.model('Tour', tourSchema)

module.exports = Tour
