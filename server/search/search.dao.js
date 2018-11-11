const sqlite = require('../sqlite')

async function getSearch (keyword) {
  return sqlite.all('SELECT ID_STR FROM TWEETS WHERE CONTENT LIKE ? ORDER BY RETWEET_COUNT DESC LIMIT 20', ['%' + keyword + '%'])
}

async function getCount (keyword) {
  return sqlite.all('SELECT COUNT(CONTENT) AS COUNT FROM TWEETS WHERE CONTENT LIKE ?', ['%' + keyword + '%'])
}

module.exports = {
  getSearch, getCount
}
