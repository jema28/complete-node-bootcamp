const AppError = require('../utils/appError')

const sendErrorDevelopment = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack
  })
}

const sendErrorProduction = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    })
  } else {
    // eslint-disable-next-line no-console
    console.log('ERROR 🔥', err)

    res.status(500).json({
      status: 'error',
      message: 'Oops, something went wrong'
    })
  }
}

const handleCastErrorDB = err => {
  return new AppError(`Invalid ${err.path}: ${err.value}`, 400)
}

const handleDuplicateFieldsDB = err => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0]
  return new AppError(`Duplicate field ${value}. Please use another value`, 400)
}

module.exports = (err, req, res, next) => {
  err.statusCode = err.statqusCode || 500
  err.status = err.status || 'error'

  if (process.env.NODE_ENV === 'development') {
    sendErrorDevelopment(err, res)
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err }
    if (error.name === 'CastError') {
      error = handleCastErrorDB(error)
    }
    if (error.code === 11000) {
      error = handleDuplicateFieldsDB(error)
    }
    sendErrorProduction(error, res)
  }
}
