const searchDao = require('./search.dao')

const getSearch = async (keyword) => {
  return searchDao.getSearch(keyword)
    .then((data) => {
      let content = { data: {}, count: 0 }
      content.data = data
      return searchDao.getCount(keyword)
        .then((data) => {
          content.count = data[0].count
          return content
        })
    })
    .catch((err) => {
      throw err
    })
}

module.exports = {
  getSearch
}
