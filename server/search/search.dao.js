const sqlite = require('../sqlite')

const getSearch = async (keyword) => {
  return sqlite.all('SELECT id_str FROM tweets WHERE content LIKE "%' + keyword + '%" ORDER BY retweet_count DESC LIMIT 20')
}
//content, retweet_count, favorite_count, created, 
const getCount = async (keyword) => {
  return sqlite.all('SELECT COUNT(content) AS COUNT FROM tweets WHERE content LIKE "%' + keyword + '%"')
}
module.exports = {
  getSearch, getCount
}
