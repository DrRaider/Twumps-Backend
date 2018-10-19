let twitterRouter = require('./twitter')
let tagcloudRouter = require('./tagcloud')
let emotionRouter = require('./emotion')
let searchRouter = require('./search')
// services call
let createApp = (server) => {
  server.use('/twitter', twitterRouter)
  server.use('/tagcloud', tagcloudRouter)
  server.use('/emotion', emotionRouter)
  server.use('/search', searchRouter)
}

module.exports = createApp
