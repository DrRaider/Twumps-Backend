const datasetDao = require('./search.dao')

const getSearch = async (keyword) => {
  return datasetDao.getSearch(keyword)
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
