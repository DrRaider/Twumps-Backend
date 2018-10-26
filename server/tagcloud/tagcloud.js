const tagcloudDao = require('./tagcloud.dao')
const natural = require('natural')
const stopword = require('stopword')

const getTagCloud = async () => {
  return tagcloudDao.getTagCloud()
    .then((ret) => {
      const max = ret[0].count
      // Percentage
      for (let i in ret) {
        ret[i].count = (ret[i].count * 100) / max
      }
      let done = []
      ret.forEach((object) => {
        done.push([object.word, object.count])
      })
      return done
    })
    .catch((err) => {
      throw err
    })
}

const setTagCloud = async () => {
  return tagcloudDao.getAllContentTweets()
    .then((data) => {
      // Data treatment
      let ret = []
      let max = 1

      for (let i in data) {
        let tweet = data[i]

        // // Clean prepositions from data
        let tokenizer = new natural.WordTokenizer()
        let content = tokenizer.tokenize(tweet.content)
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
      return tagcloudDao.setTagCloud(ret)
    })
    .catch((err) => {
      throw err
    })
}

const updateTagCloud = async (data) => {
  return tagcloudDao.updateTagCloud(data)
}

module.exports = {
  getTagCloud, setTagCloud, updateTagCloud
}
