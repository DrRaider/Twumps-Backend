const sqlite = require('../sqlite')

const getSearch = async (keyword) => {
  return sqlite.all('SELECT CONTENT,retweet_count,favorite_count,created_at FROM TWEETS WHERE CONTENT LIKE "%' + keyword + '%" ORDER BY retweet_count DESC LIMIT 20')
}

const getCount = async (keyword) => {
  return sqlite.all('SELECT COUNT(CONTENT) AS COUNT FROM TWEETS WHERE CONTENT LIKE "%' + keyword + '%"')
}
module.exports = {
  getSearch, getCount
}
