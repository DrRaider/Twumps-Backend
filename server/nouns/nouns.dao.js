const sqlite = require('../sqlite')

const getCityList = async () => {
  return sqlite.all('SELECT CITY FROM CITIES')
}

const addTweetCity = async (city, tweetId) => {
  return sqlite.all('INSERT INTO CITIES (CITY, TWEET_ID) VALUES ("' + city + '", "' + tweetId + '")')
}

const getAllContentRetweets = async () => {
  return sqlite.all('SELECT CONTENT FROM TWEETS')
}
module.exports = {
  getCityList, getAllContentRetweets, addTweetCity
}
