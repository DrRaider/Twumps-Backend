const sqlite = require('../sqlite')

async function getRetweet () {
  return sqlite.all('SELECT id_str,CREATED FROM tweets ORDER BY retweet_count DESC LIMIT 15', [])
}

module.exports = {
  getRetweet
}
