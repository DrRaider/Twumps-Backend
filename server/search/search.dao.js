const sqlite = require('../sqlite')

async function getSearch (keyword) {
  return sqlite.all('SELECT id_str FROM tweets WHERE content LIKE ? ORDER BY retweet_count DESC LIMIT 20', ['%' + keyword + '%'])
}

async function getCount (keyword) {
  return sqlite.all('SELECT COUNT(content) AS COUNT FROM tweets WHERE content LIKE ?', ['%' + keyword + '%'])
}
module.exports = {
  getSearch, getCount
}
