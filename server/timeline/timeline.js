const timelineDao = require('./timeline.dao')

async function getRetweet () {
    return timelineDao.getRetweet()
}

module.exports = {
  getRetweet
}
