const mongoose = require('mongoose')
const slugify = require('slugify')

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      unique: true,
      trim: true
    },
    slug: String,
    duration: {
      type: Number,
      required: [true, 'A tour must have a duration']
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'A tour must have a group size']
    },
    difficulty: {
      type: String,
      required: [true, 'A tour must have a difficulty']
    },
    ratingsAverage: {
      type: Number,
      default: 4.5
    },
    ratingsQuantity: {
      type: Number,
      default: 0
    },
    price: {
      type: Number,
      require: [true, 'A tour must have a price']
    },
    priceDiscount: Number,
    summary: {
      type: String,
      trim: true
    },
    description: {
      type: String,
      trim: true,
      required: [true, 'A tour must have a description']
    },
    imageCover: {
      type: String
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false
    },
    startDates: [Date]
  },
  {
    // schema options
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
)

tourSchema.virtual('durationWeeks').get(function() {
  return this.duration / 7
})

// document middleware: runs before .save() and .create()
// this doesn't work on insertMany or findOne or update
// this is called a pre save hook
tourSchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true })
  next()
})

// tourSchema.pre('save', function() {
//   console.log('Will save document...')
//   next()
// })

// tourSchema.post('save', function(document, next) {
//   console.log(document)
//   next()
// })

const Tour = mongoose.model('Tour', tourSchema)

module.exports = Tour
