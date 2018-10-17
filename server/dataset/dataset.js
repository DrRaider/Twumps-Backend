const datasetDao = require('./dataset.dao')
const natural = require('natural')
const stopword = require('stopword')

const getAllRetweets = async () => {
  return datasetDao.getAllRetweets()
    .then((data) => {
      // TODO: transform date to Date object
      return data
    })
    .catch((err) => {
      throw err
    })
}

const getSearch = async (keyword) => {
  return datasetDao.getSearch(keyword)
    .then((data) => {
      return data
    })
    .catch((err) => {
      throw err
    })
}

const getTagCloud = async () => {
  return datasetDao.getAllContentTweets()
    .then((data) => {
      // Data treatment
      let ret = []
      let max = 1

      for (let i in data) {
        let tweet = data[i]

        // // Clean prepositions from data
        let tokenizer = new natural.WordTokenizer()
        let content = tokenizer.tokenize(tweet.CONTENT)
        let words = stopword.removeStopwords(content)
        words = stopword.removeStopwords(words, ['realdonaldtrump', '000', 'https', 'http', 'will', 'when', 'pm', 'am', 'amp', 'one', 'don', 'why', 'she', 'want', 'via', 'say', 'keep', 'doing', 'show', 'soon', 'long'])

        // Remove letter (length 1)
        words = words.filter(x => x.length > 2)

        // Add new words to the list, and count + 1 to the words already registered
        for (let j in words) {
          words[j] = words[j].toLowerCase()

          let id = ret.findIndex(x => x[0] === words[j])
          if (id === -1) {
            ret.push([words[j], 1])
          } else {
          	ret[id][1]++
          	max = ret[id][1] > max ? ret[id][1] : max
          }
        }
      }
      ret = ret.sort(function (a, b) { return a[1] > b[1] ? -1 : 1 })
      ret = ret.slice(0, 100)

      // Percentage
      for (let i in ret) {
      	ret[i][1] = (ret[i][1] * 100) / max
      }

      return ret
    })
    .catch((err) => {
      throw err
    })
}

module.exports = {
  getAllRetweets, getTagCloud, getSearch 
}
