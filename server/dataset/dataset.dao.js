const sqlite = require('../sqlite')

const getAllRetweets = async () => {
  return sqlite.all('SELECT retweet_count, created_at FROM tweets')
}

module.exports = {
  getAllRetweets
}
