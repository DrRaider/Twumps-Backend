const sqlite = require('../sqlite')

const getSearch = async (keyword) => {
  return sqlite.all('SELECT CONTENT, RETWEET_COUNT, FAVORITE_COUNT, CREATED, ID_STR FROM TWEETS WHERE CONTENT LIKE "%' + keyword + '%" ORDER BY RETWEET_COUNT DESC LIMIT 20')
}

const getCount = async (keyword) => {
  return sqlite.all('SELECT COUNT(CONTENT) AS COUNT FROM TWEETS WHERE CONTENT LIKE "%' + keyword + '%"')
}
module.exports = {
  getSearch, getCount
}
