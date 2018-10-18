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
  return datasetDao.getTagCloud()
    .then((ret) => {
      const max = ret[0].COUNT
      // Percentage
      for (let i in ret) {
        ret[i].COUNT = (ret[i].COUNT * 100) / max
      }
      let done = []
      ret.forEach((object) => {
        done.push([object.WORD, object.COUNT])
      })
      return done
    })
    .catch((err) => {
      throw err
    })
}

const setTagCloud = async () => {
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
      return datasetDao.setTagCloud(ret)
    })
    .catch((err) => {
      throw err
    })
}

const updateTagCloud = async (data) => {
  return datasetDao.updateTagCloud(data)
}

module.exports = {
  getAllRetweets, getTagCloud, getSearch, setTagCloud, updateTagCloud
}
