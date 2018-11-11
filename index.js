const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const cors = require('cors')
const logger = require('./server/utils/logger')
const errorHandler = require('./server/utils/errors').errorHandler

const set = require('./server/tagcloud/tagcloud')

require('dotenv').config()

let app = express()

app.use(morgan('dev', { 'stream': logger.stream }))
app.use(helmet())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(express.static('data/img'))

// Call app routers
require('./server/app')(app)

app.use('/', async (req, res) => {
  res.end('App is running')
})

// Call error handlers
app.use(errorHandler)

app.listen(process.env.WEB_PORT, () => {
  try {
    console.log(set.setTagCloud())
  } catch (e) {
    console.log(e)
  }
  console.log(`App is listening on port ${process.env.WEB_PORT}`)
})
