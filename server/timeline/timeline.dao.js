const sqlite = require('../sqlite')

async function getRetweet () {
  return sqlite.all('SELECT ID_STR, CREATED FROM TWEETS ORDER BY RETWEET_COUNT DESC LIMIT 1', [])
}

module.exports = {
  getRetweet
}
