const sqlite = require('../sqlite')

async function getCityList () {
  return sqlite.all('SELECT CITY, TWEETID, LAT, LON FROM CITIES', [])
}

async function addTweetCity (city, tweetId) {
  return sqlite.run('INSERT INTO CITIES (CITY, TWEETID) VALUES (?,?)', [city.toString(), tweetId])
}

async function getAllContentRetweets () {
  return sqlite.all('SELECT ID, CONTENT FROM TWEETS', [])
}
module.exports = {
  getCityList, getAllContentRetweets, addTweetCity
}
