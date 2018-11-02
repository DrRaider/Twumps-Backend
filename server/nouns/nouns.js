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
        console.log(results)
        results = stopword.removeStopwords(results.split(' '))
        results = stopword.removeStopwords(results, ['Bush', 'Day', 'Martin', 'Luther', 'King', 'CNN', 'Trump', 'Hillary', '000', 'https', 'http', 'will', 'when', 'pm', 'am', 'amp', 'one', 'don', 'why', 'she', 'want', 'via', 'say', 'keep', 'doing', 'show', 'soon', 'long']).toString()
        console.log(results)

        // eslint-disable-next-line no-useless-escape
        results = results.replace(/[.,\/#!$%\^&\*\";:{}=\-_`~()]/g, ' ')
        results = new pos.Lexer().lex(results)
        let tagger = new pos.Tagger()
        let taggedWords = tagger.tag(results)
        console.log(taggedWords)
        if (results.length > 0) {
          for (i in taggedWords) {
            let word = taggedWords[i]
            if (word[1] === 'NNP' && word[0].length > 1) {
              console.log(await searchCity(word[0]))
            }
          }
        }
      }

    })
    .then(() => {
      return true
    })
    .catch(err => {
      throw err
    })
}

let searchCity = async (name) => {
  return NominatimJS.search({ q: name })
    .then(cities => {
      if (cities !== []) {
        let city = cities[0]
        return name + ' ' + city.display_name
      }
    })
}

module.exports = {
  getCityList
}
