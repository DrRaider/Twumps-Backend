const sqlite = require('../sqlite')

const getAllContentAndCreatedAtTweets = async () => {
  return sqlite.all('SELECT CREATED_AT, CONTENT FROM TWEETS')
}

const getEmotion = async () => {
  return sqlite.all('SELECT * FROM EMOTION')
}

const setEmotion = async (year, pos, neutral, neg) => {
  return sqlite.run('INSERT INTO EMOTION (YEAR, POS, NEUTRAL, NEG) VALUES (' + year + ', ' + pos + ', ' + neutral + ', ' + neg + ')')
}

const updateEmotion = async (data) => {
  return sqlite.run('INSERT INTO tagcloud (word, count) VALUES ("' + data.word + '", ' + data.count + ')')
}

module.exports = {
  getAllContentAndCreatedAtTweets, getEmotion, setEmotion, updateEmotion
}
