const datasetDao = require('./dataset.dao')

const getAllRetweets = async () => {
  return datasetDao.getAllRetweets()
}

module.exports = {
  getAllRetweets
}
