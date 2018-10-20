const searchDao = require('./search.dao')

const getSearch = async (keyword) => {
  return searchDao.getSearch(keyword)
    .then((data) => {
      return data
    })
    .catch((err) => {
      throw err
    })
}

module.exports = {
  getSearch
}
