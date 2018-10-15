let twitterRouter = require('./twitter')
let datasetRouter = require('./dataset')
// services call
let createApp = (server) => {
  server.use('/twitter', twitterRouter)
  server.use('/dataset', datasetRouter)
}

module.exports = createApp
