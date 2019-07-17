const Tour = require('../models/tours')
const APIFeatures = require('../utils/apiFeatures')

exports.aliasTopTours = (req, res, next) => {
  req.query.limit = 5
  req.query.sort = '-ratingsAverage,price'
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty'
  next()
}

exports.getAllTours = async (req, res) => {
  try {
    const features = new APIFeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate()
    const tours = await features.query

    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: { tours }
    })
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    })
  }
}

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id)

    res.status(200).json({
      status: 'success',
      data: { tour }
    })
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    })
  }
}

exports.createTour = async (req, res) => {
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
      message: err
    })
  }
}

exports.updateTour = async (req, res) => {
  try {
    // pass in id and the data we want to change
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      // the new updated document will be returned and run validators from schema again
      new: true,
      runValidators: true
    })
    res.status(200).json({
      status: 'success',
      data: {
        tour
      }
    })
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    })
  }
}

exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id)

    res.status(204).json({
      status: 'success',
      data: null
    })
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    })
  }
}

exports.getTourStats = async (req, res) => {
  try {
    const stats = await Tour.aggregate([
      {
        // match is to select or filter certain documents
        $match: { ratingsAverage: { $gte: 4.5 } }
      },
      {
        $group: {
          _id: '$difficulty',
          numberOfTours: { $sum: 1 },
          numberOfRatings: { $sum: '$ratingsQuantity' },
          averageRating: { $avg: '$ratingsAvergage' },
          averagePrice: { $avg: '$price' },
          minimumPrice: { $min: '$price' },
          maximumPrice: { $max: '$price' }
        }
      },
      {
        // 1 for descending
        $sort: { averagePrice: 1 }
      }
      // {
      //   // not equals
      //   $match: { _id: { $ne: 'easy' } }
      // }
    ])

    res.status(200).json({
      status: 'success',
      data: {
        stats
      }
    })
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    })
  }
}

exports.getMonthlyPlan = async (req, res) => {
  try {
    const year = req.params.year * 1

    const plan = await Tour.aggregate([
      {
        // unwind will desconstruct an array field and the output
        // one docuemnt of each element of the array
        $unwind: '$startDates'
      },
      {
        $match: {
          startDates: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`)
          }
        }
      },
      {
        $group: {
          _id: { $month: '$startDates' },
          numberOfTourStarts: { $sum: 1 },
          tours: {
            $push: '$name'
          }
        }
      },
      {
        $addFields: { month: '$_id' }
      },
      {
        $project: {
          _id: 0
        }
      },
      {
        $sort: { numberOfTourStarts: -1 }
      },
      {
        $limit: 12
      }
    ])
    res.status(200).json({
      status: 'success',
      data: {
        plan
      }
    })
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    })
  }
}
