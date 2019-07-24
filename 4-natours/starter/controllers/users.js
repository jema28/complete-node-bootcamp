const User = require('../models/users')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')

const filterObject = (object, ...allowedFields) => {
  const newObject = {}
  Object.keys(object).forEach(el => {
    if (allowedFields.includes(el)) newObject[el] = object[el]
  })
  return newObject
}

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find()

  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users
    }
  })
})

exports.updateData = catchAsync(async (req, res, next) => {
  // 1 Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates. Please use /update-password',
        400
      )
    )
  }

  // 2 Filtered out unwanted field names that are not allowed to be updated
  const filteredBody = filterObject(req.body, 'name', 'email')

  // 3 Update user document
  // (using findByIdAndUpdate as we're not changing sensitive data)
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true
  })

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser
    }
  })
})

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!'
  })
}

exports.getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!'
  })
}

exports.updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!'
  })
}

exports.deleteUser = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false })

  res.status(204).json({
    status: 'success',
    data: null
  })
})
