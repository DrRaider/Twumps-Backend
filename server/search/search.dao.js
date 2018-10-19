const sqlite = require('../sqlite')

const getSearch = async (keyword) => {
  return sqlite.all('SELECT content FROM tweets WHERE content like "%' + keyword + '%" ORDER BY DESC LIMIT 20')
}

module.exports = {
  getSearch
}
