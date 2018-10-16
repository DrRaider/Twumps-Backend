const sqlite = require('../sqlite')

const getAllRetweets = async () => {
  return sqlite.all('SELECT retweet_count, created_at FROM tweets')
}

const getAllContentTweets = async () => {
  return sqlite.all('SELECT content FROM tweets')
}

const getSearch = async (keyword) => {
  return sqlite.all('SELECT content FROM tweets WHERE content like "%' + keyword + '%" LIMIT 20')
}

module.exports = {
  getAllRetweets, getAllContentTweets, getSearch
}
