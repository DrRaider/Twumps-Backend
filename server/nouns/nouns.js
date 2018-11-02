const nounsDao = require('./nouns.dao')
const { NominatimJS } = require('nominatim-js')
const stopword = require('stopword')
const pos = require('pos')

const getCityList = async () => {
  return nounsDao.getAllContentRetweets()
    .then(async (data) => {
      for (let i in data) {
        let tweet = data[i]

        let results = tweet.content.replace(/(?:https?|ftp):\/\/[\n\S]+/g, '')
        // eslint-disable-next-line no-useless-escape
        results = results.replace(/[.,\/#!$%\^&\*\";:{}=\-_`~()]/g, '')
        results = stopword.removeStopwords(results.split(' '))
        console.log(results)
        results = stopword.removeStopwords(results, [ 'WIN' ]).toString() // TODO : make it work + clean console.log
        console.log(results)
        results = new pos.Lexer().lex(results)
        let tagger = new pos.Tagger()
        let taggedWords = tagger.tag(results)

        for (i in taggedWords) {
          let word = taggedWords[i]
          if (word[1] === 'NNP' && word[0].length > 1) {
            await delay(1000)
            searchCity(word[0])
              .then((city) => {
                if (city !== undefined) {
                  console.log(tweet)
                  console.log(city)
                  // nounsDao.addTweetCity(city, tweet.id)
                }
              })
              .catch(err => {
                throw err
              })
          }
        }
      }
      return true
    })
    .catch(err => {
      throw err
    })
}

let searchCity = async (name) => {
  return NominatimJS.search({ q: name })
    .then(cities => {
      let filtered
      if (cities !== []) {
        filtered = cities.filter(a => a.type === 'city' && a.importance > 0.6)
        return filtered[0]
      }
    })
    .catch(err => {
      throw err
    })
}

function delay (ms) {
  return new Promise((resolve) => { return setTimeout(resolve, ms) })
}

module.exports = {
  getCityList
}
