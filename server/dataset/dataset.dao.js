const sqlite = require('../sqlite')

const getAllRetweets = async () => {
  return sqlite.all('SELECT retweet_count FROM tweets')
}

const getAllContentTweets = async () => {
  return sqlite.all('SELECT content FROM tweets')
}

module.exports = {
  getAllRetweets, getAllContentTweets
}
