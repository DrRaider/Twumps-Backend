let tagcloudRouter = require('./tagcloud')
let emotionRouter = require('./emotion')
let searchRouter = require('./search')
let nounsRouter = require('./nouns')
let timelineRouter = require('./timeline')
// services call
function createApp (server) {
  server.use('/tagcloud', tagcloudRouter)
  server.use('/emotion', emotionRouter)
  server.use('/search', searchRouter)
  server.use('/nouns', nounsRouter)
  server.use('/timeline', timelineRouter)
}

module.exports = createApp
