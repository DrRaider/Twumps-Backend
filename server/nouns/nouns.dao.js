const sqlite = require('../sqlite')

const getCityList = async () => {
  return sqlite.all('SELECT CITY FROM CITIES')
}

const addTweetCity = async (city, tweetId) => {
  return sqlite.all('INSERT INTO CITIES (CITY, TWEET_ID) VALUES ("' + city + '", "' + tweetId + '")')
}

const getAllContentRetweets = async () => {
  return sqlite.all('SELECT ID, CONTENT FROM TWEETS LIMIT 50')
}
module.exports = {
  getCityList, getAllContentRetweets, addTweetCity
}
