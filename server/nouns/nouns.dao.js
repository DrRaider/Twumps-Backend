const sqlite = require('../sqlite')

async function getCityList () {
  return sqlite.all('SELECT CITY, TWEETID FROM CITIES', [])
}

async function addTweetCity (city, tweetId) {
  return sqlite.all('INSERT INTO CITIES (CITY, TWEET_ID) VALUES (?,?)', [city, tweetId])
}

async function getAllContentRetweets () {
  return sqlite.all('SELECT ID, CONTENT FROM TWEETS LIMIT 50', [])
}
module.exports = {
  getCityList, getAllContentRetweets, addTweetCity
}
