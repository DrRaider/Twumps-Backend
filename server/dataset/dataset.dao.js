const sqlite = require('../sqlite')

const getAllRetweets = async () => {
  return sqlite.all('SELECT retweet_count, created_at FROM tweets')
}

const getAllContentTweets = async () => {
  return sqlite.all('SELECT content FROM tweets')
}

const getSearch = async (keyword) => {
  return sqlite.all('SELECT content FROM tweets WHERE content like "%' + keyword + '%" ORDER BY DESC LIMIT 20')
}

const getTagCloud = async () => {
  return sqlite.all('SELECT word, COUNT FROM tagcloud ORDER BY COUNT DESC LIMIT 150')
}

const setTagCloud = async (data) => {
  for (let i = 0; i < data.length; i++) {
    sqlite.run('INSERT INTO tagcloud (word, count) VALUES ("' + data[i][0] + '", ' + data[i][1] + ')')
      .catch((err) => {
        throw err
      })
  }
  return true
}

const updateTagCloud = async (data) => {
  return sqlite.run('INSERT INTO tagcloud (word, count) VALUES ("' + data.word + '", ' + data.count + ')')
}

module.exports = {
  getAllRetweets, getAllContentTweets, getSearch, getTagCloud, setTagCloud, updateTagCloud
}
