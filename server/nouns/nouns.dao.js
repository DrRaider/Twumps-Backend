const sqlite = require('../sqlite')

async function getCityList () {
  return sqlite.all('SELECT CITY, TWEETID, LAT, LON FROM CITIES', [])
}

async function addTweetCity (data) {
  return sqlite.run('INSERT INTO CITIES (CITY, LAT, LON, TWEETID, RETWEET_COUNT) VALUES (?,?,?,?,?)',
    [
      data.city, data.lat, data.lon, data.tweetId, data.retweetCount
    ]
  )
}

async function getAllContentRetweets () {
  return sqlite.all('SELECT ID_STR, CONTENT, RETWEET_COUNT FROM TWEETS', [])
}
module.exports = {
  getCityList, getAllContentRetweets, addTweetCity
}
