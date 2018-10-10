let twitterRouter = require('./twitter')

// services call
let createApp = (server) => {
  server.use('/twitter', twitterRouter)
}

module.exports = createApp
