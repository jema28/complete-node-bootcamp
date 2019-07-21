const User = require('../models/user')
const catchAsync = require('../utils/catchAsync')

exports.signup = catchAsync(async (req, res, next) => {
  // pass in an object with the user data
  const newUser = await User.create(req.body)

  res.status(201).json({
    status: 'success',
    data: {
      user: newUser
    }
  })
})
