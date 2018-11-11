let tagcloudRouter = require('./tagcloud')
let emotionRouter = require('./emotion')
let searchRouter = require('./search')
let nounsRouter = require('./nouns')
let timelineRouter = require('./timeline')

// services call
function createApp (server) {
  server.use('/api/tagcloud', tagcloudRouter)
  server.use('/api/emotion', emotionRouter)
  server.use('/api/search', searchRouter)
  server.use('/api/nouns', nounsRouter)
  server.use('/api/timeline', timelineRouter)
}

module.exports = createApp
