const express = require('express')
const morgan = require('morgan')

const tourRouter = require('./routes/tours')
const userRouter = require('./routes/users')

// --- MIDDLEWARES ---
const app = express()

if (process.env.NODE_ENV) {
  app.use(morgan('dev'))
}

app.use(express.json())
app.use(express.static(`${__dirname}/public`))

// -- ROUTERS ---
// act as sub apps to separate the routes
app.use('/api/v1/tours', tourRouter)
app.use('/api/v1/users', userRouter)

app.all('*', (req, res, next) => {
  const err = new Error(`Can't find ${req.originalUrl} on this server`)
  err.status = 'fail'
  err.statusCode = 404
  next(err)
})

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500
  err.status = err.status || 'error'
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message
  })
})

module.exports = app
