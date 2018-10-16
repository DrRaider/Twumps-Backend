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

const getTagCloud = async () => {
  return datasetDao.getAllContentTweets()
    .then((data) => {
      // Data treatment
      let ret = []
      for (let i in data) {
        let tweet = data[i]

        // Clean URLs, \n, numbers from data
        tweet.CONTENT = tweet.CONTENT.replace(/(?:https?):\/\/[\n\S]+/g, '')
        tweet.CONTENT = tweet.CONTENT.replace(/\\n+/g, '')
        tweet.CONTENT = tweet.CONTENT.replace(/\d+/g, '')

        // Clean prepositions from data
        let tokenizer = new natural.WordTokenizer()
        let content = tokenizer.tokenize(tweet.CONTENT)
        let words = stopword.removeStopwords(content)
        words = stopword.removeStopwords(words, ['realdonaldtrump', 'will', 'when', 'pm', 'am', 'amp', 'one', 'don', 'why', 'she', 'want', 'via'])

        // Remove letter (length 1)
        words = words.filter(x => x.length > 2)

        // Add new words to the list, and count + 1 to the words already registered
        for (let j in words) {
          words[j] = words[j].toLowerCase()

          if (ret.find(x => x['key'] === words[j])) {
            let id = ret.findIndex(x => x['key'] === words[j])
            ret[id]['value']++
          } else {
            ret.push({
              'key': words[j],
              'value': 1
            })
          }
        }
      }
      ret = ret.sort(function (a, b) { return a['value'] > b['value'] ? -1 : 1 })
      ret = ret.slice(0, 100)
      console.log(ret)
      return ret
    })
    .catch((err) => {
      throw err
    })
}

module.exports = {
  getAllRetweets, getTagCloud
}
