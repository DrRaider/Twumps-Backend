const sqlite = require('../sqlite')

const getAllContentAndCreatedAtTweets = async () => {
  return sqlite.all('SELECT CREATED, CONTENT FROM TWEETS WHERE proba > 0.90')
  // To have more realistic results, add WHERE SOURCE = "Twitter for Android" at the end of the query
}

const getEmotion = async () => {
  return sqlite.all('SELECT * FROM EMOTION')
}

const setEmotion = async (year, pos, neutral, neg) => {
  return sqlite.run('INSERT INTO EMOTION (YEAR, POS, NEUTRAL, NEG) VALUES (' + year + ', ' + pos + ', ' + neutral + ', ' + neg + ')')
}

module.exports = {
  getAllContentAndCreatedAtTweets, getEmotion, setEmotion
}
