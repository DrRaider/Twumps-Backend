const sqlite = require('../sqlite')

async function getCityList () {
  return sqlite.all(
    'SELECT CITY, LAT, LON, TWEETID, CAST(RETWEET_COUNT AS INT) AS retweet_count FROM CITIES AS T1 INNER JOIN (' +
    'SELECT CITY AS CITY2, LAT AS LAT2, LON AS LON2, TWEETID AS TWEETID2, MAX(CAST(RETWEET_COUNT AS INT)) ' +
    'AS MAXI FROM CITIES GROUP BY CITY2 HAVING COUNT(*)>6) AS T2 ON T1.CITY = T2.CITY2 ' +
    'AND T1.LAT = T2.LAT2 AND T1.LON = T2.LON2 AND T1.TWEETID = T2.TWEETID2 AND CAST(T1.RETWEET_COUNT AS INT) = T2.MAXI'
    , [])
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
