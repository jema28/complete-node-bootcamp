const mongoose = require('mongoose')
const env = require('dotenv')
const app = require('./app')

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

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`App running on on http://localhost:${port}`)
})
