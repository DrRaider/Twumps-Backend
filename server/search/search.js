const searchDao = require('./search.dao')

async function getSearch (keyword) {
  try {
    const data = await searchDao.getSearch(keyword)
    let content = { data: {}, count: 0 }
    content.data = data
    const results = await searchDao.getCount(keyword)
    content.count = results[0].count
    return content
  } catch (e) {
    throw e
  }
}

module.exports = {
  getSearch
}
