const sqlite = require('../sqlite')
const _cliProgress = require('cli-progress')
const bar1 = new _cliProgress.Bar({}, _cliProgress.Presets.shades_classic)

async function getAllContentTweets () {
  return sqlite.all('SELECT CONTENT FROM TWEETS  WHERE AUTHOR = "Mr. Trump"', [])
}

async function getTagCloud () {
  return sqlite.all('SELECT WORD, COUNT FROM TAGCLOUD ORDER BY COUNT DESC LIMIT 150', [])
}

async function setTagCloud (data) {
  try {
    bar1.start(100, 0)
    for (let i = 0; i < data.length; i++) {
      await sqlite.run('INSERT INTO TAGCLOUD (WORD, COUNT) VALUES (?,?)', [data[i][0], data[i][1]])
      bar1.update(100 * i / data.length)
    }
    bar1.stop()
    return true
  } catch (e) {
    throw e
  }
}

module.exports = {
  getAllContentTweets, getTagCloud, setTagCloud
}
