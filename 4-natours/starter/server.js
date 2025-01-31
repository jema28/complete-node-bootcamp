/* eslint-disable no-console */

const mongoose = require('mongoose')
const env = require('dotenv')

process.on('uncaughtException', err => {
  console.log('Unhandled exception. Shutting down.')
  console.log(err.name, err.message)
  process.exit(1)
})

env.config({ path: './config.env' })
const app = require('./app')

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

const port = process.env.PORT || 3000

const server = app.listen(port, () => {
  console.log(`App running on on http://localhost:${port}`)
})

process.on('unhandledRejection', err => {
  console.log('Unhandled rejection. Shutting down.')
  console.log(err.name, err.message)
  server.close(() => {
    process.exit(1)
  })
})
