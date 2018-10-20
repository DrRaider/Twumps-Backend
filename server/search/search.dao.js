const sqlite = require('../sqlite')

const getSearch = async (keyword) => {
  return  sqlite.all('SELECT content FROM tweets WHERE content like "%' + keyword + '%" ORDER BY Created_at DESC LIMIT 20')
}

const getCount = async (keyword) => {
  return sqlite.all('SELECT COUNT(content) as count FROM tweets WHERE content like "%' + keyword + '%"')
}
module.exports = {
  getSearch,getCount
}
