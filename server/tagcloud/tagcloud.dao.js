const sqlite = require('../sqlite')

const getAllContentTweets = async () => {
  return sqlite.all('SELECT CONTENT FROM TWEETS')
}

const getTagCloud = async () => {
  return sqlite.all('SELECT WORD, COUNT FROM TAGCLOUD ORDER BY COUNT DESC LIMIT 150')
}

const setTagCloud = async (data) => {
  for (let i = 0; i < data.length; i++) {
    sqlite.run('INSERT INTO TAGCLOUD (WORD, COUNT) VALUES ("' + data[i][0] + '", ' + data[i][1] + ')')
      .catch((err) => {
        throw err
      })
  }
  return true
}

const updateTagCloud = async (data) => {
  return sqlite.run('INSERT INTO TAGCLOUD (WORD, COUNT) VALUES ("' + data.word + '", ' + data.count + ')')
}

module.exports = {
  getAllContentTweets, getTagCloud, setTagCloud, updateTagCloud
}
