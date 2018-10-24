const sqlite = require('../sqlite')

const getSearch = async (keyword) => {
  return sqlite.all('SELECT CONTENT FROM TWEETS WHERE CONTENT LIKE "%' + keyword + '%" ORDER BY CREATED_AT DESC LIMIT 20')
}

const getCount = async (keyword) => {
  return sqlite.all('SELECT COUNT(CONTENT) AS COUNT FROM TWEETS WHERE CONTENT LIKE "%' + keyword + '%"')
}
module.exports = {
  getSearch, getCount
}
