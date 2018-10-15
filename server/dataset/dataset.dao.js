const sqlite = require('../sqlite')

const getAllRetweets = async () => {
  return sqlite.all('SELECT retweet_count FROM tweets')
}

module.exports = {
  getAllRetweets
}
