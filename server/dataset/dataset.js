const datasetDao = require('./dataset.dao')

const getAllRetweets = async () => {
  await datasetDao.getAllRetweets()
    .then((data) => {
      // TODO: transform date to Date object
      return data
    })
    .catch((err) => {
      throw err
    })
}

module.exports = {
  getAllRetweets
}
