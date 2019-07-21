const express = require('express')
const morgan = require('morgan')

const AppError = require('./utils/appError')
const globalErrorHandler = require('./controllers/error')
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
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404))
})

app.use(globalErrorHandler)

module.exports = app
