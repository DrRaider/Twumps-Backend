const nounsDao = require('./nouns.dao')
const { NominatimJS } = require('nominatim-js')
const stopword = require('stopword')
const pos = require('pos')
const _cliProgress = require('cli-progress')
const bar1 = new _cliProgress.Bar({}, _cliProgress.Presets.shades_classic)

async function getCityList () {
  return nounsDao.getCityList()
}

async function setCityList () {
  try {
    const data = await nounsDao.getAllContentRetweets()
    console.log('Started nouns analysis...')
    bar1.start(100, 0)
    let array = []
    for (let i in data) {
      let tweet = data[i]
      let results = tweet.content.replace(/(?:https?|ftp):\/\/[\n\S]+/g, '')
      // eslint-disable-next-line no-useless-escape
      results = results.replace(/[.,\/#!$%\^&\*\";:{}=\-_`~()]/g, '')
      results = stopword.removeStopwords(results.split(' '))
      results = stopword.removeStopwords(results, ['win']).toString()
      results = new pos.Lexer().lex(results)
      let tagger = new pos.Tagger()
      let taggedWords = tagger.tag(results)

      for (let j in taggedWords) {
        let word = taggedWords[j]
        if (word[1] === 'NNP' && word[0].length > 1) {
          await delay(1000)
          const city = await searchCity(word[0])
          if (city !== undefined) {
            array.push(city.display_name)
            // nounsDao.addTweetCity(city, tweet.id)
          }
        }
      }
      bar1.update(100 * i / data.length)
    }
    bar1.stop()
    console.log(array)
    return true
  } catch (e) {
    throw e
  }
}

async function searchCity (name) {
  try {
    const cities = await NominatimJS.search({ q: name })
    let filtered
    if (cities !== []) {
      filtered = cities.filter(a => a.type === 'city' && a.importance > 0.6)
      return filtered[0]
    }
  } catch (e) {
    throw e
  }
}

function delay (ms) {
  return new Promise((resolve) => { return setTimeout(resolve, ms) })
}

module.exports = {
  setCityList, getCityList
}
