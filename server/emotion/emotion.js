const emotionDao = require('./emotion.dao')
let Sentiment = require('sentiment')
let moment = require('moment')

const getEmotion = async () => {
  return emotionDao.getEmotion()
    .then((ret) => {
      // TODO : adapt data to d3js
      return ret
    })
    .catch((err) => {
      throw err
    })
}

const setEmotion = async () => {
  return emotionDao.getAllContentAndCreatedAtTweets()
    .then(async (data) => {
      data.sort(function (left, right) {
        return moment.utc(left.created, 'YYYY-MM-DD HH:mm:ss').diff(moment.utc(right.created, 'YYYY-MM-DD HH:mm:ss'))
      })
      // Get indexes for each year
      let years = {}
      for (let i = 0; i < data.length; i++) {
        let year = moment(data[i].created, 'YYYY-MM-DD HH:mm:ss', 'en').format('YYYY')
        if (year in years) {
          years[year][1] = i
        } else {
          years[year] = [2]
          years[year][0] = i
        }
      }
      for (let year in years) {
        let sentiment = new Sentiment()
        let start = years[year][0]
        let end = years[year][1]
        let pos = 0 // scrore
        let posCount = 0 // Number of positive tweets
        let neutral = 0
        let neutralCount = 0
        let neg = 0
        let negCount = 0
        // get the sum of all positivity, negativity and neutrality of each year
        for (let i = start; i <= end; i++) {
          let result = sentiment.analyze(data[i].content).score
          if (result > 0) {
            pos += result
            posCount++
          }
          if (result < 0) {
            neg += result
            negCount++
          }
          if (result === 0) {
            neutral += result
            neutralCount++
          }
        }
        // TODO : use percentage and score together to evaluate th elevel of positivity/negativity/neutrality in the percentage
        // Calculate the percentage
        posCount *= 100 / (end - start + 1)
        neutralCount *= 100 / (end - start + 1)
        negCount *= 100 / (end - start + 1)
        // Stock it in the database
        try {
          await emotionDao.setEmotion(year, posCount, neutralCount, negCount)
        } catch (e) {
          throw e
        }
      }
      return true
    })
    .catch((err) => {
      throw err
    })
}

const updateEmotion = async (data) => {
  // TODO
  return emotionDao.updateEmotion(data)
}

module.exports = {
  getEmotion, setEmotion, updateEmotion
}
