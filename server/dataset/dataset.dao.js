const sqlite = require('../sqlite')

const getAllRetweets = async () => {
  return sqlite.all('SELECT RETWEET_COUNT, CREATED FROM TWEETS')
}

module.exports = {
  getAllRetweets
}
