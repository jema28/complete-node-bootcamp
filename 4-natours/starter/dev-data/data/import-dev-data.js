/* eslint-disable no-console */

const mongoose = require('mongoose')
const fs = require('fs')
const env = require('dotenv')
const Tour = require('../../models/tours')

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

const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'))

const importData = async () => {
  try {
    await Tour.create(tours)
    console.log('Data successfully loaded!')
  } catch (err) {
    console.log(err)
  }
  process.exit()
}

const deleteData = async () => {
  try {
    await Tour.deleteMany()
    console.log('Data deleted successfully')
  } catch (err) {
    console.log(err)
  }
  process.exit()
}

if (process.argv[2] === '--import') {
  importData()
} else if (process.argv[2] === '--delete') {
  deleteData()
}
