const sqlite = require('../sqlite')

let getTweets = async () => {
  return sqlite.all('SELECT CONTENT, DATED, USER, NAME FROM TWEETS')
}

let updateTweet = async (id, tweet) => {
  let q1 = `INSERT OR IGNORE INTO TWEETS (ID, CONTENT, DATED, USER, NAME) VALUES (` + id + `, "` + tweet.text + `", "` + tweet.date + `", "` + tweet.user + `", "` + tweet.name + `")`
  let q2 = `UPDATE TWEETS SET CONTENT= "` + tweet.text + `", DATED= "` + tweet.date + `", USER= "` + tweet.user + `", NAME= "` + tweet.name + `" WHERE id=` + id
  await sqlite.run(q1).catch((err) => {
    throw err
  })
  return sqlite.run(q2)
}

let deleteTweets = async () => {
  return sqlite.run(`DELETE FROM TWEETS`)
}

// Config Table
let getConfig = async () => {
  return sqlite.get('SELECT * FROM TWEETS_CONFIG WHERE ID=1')
}

let getInAds = async () => {
  return sqlite.get('SELECT ADS FROM TWEETS_CONFIG WHERE ID=1')
}

let editConfig = async (account, hashtag, used, ads) => {
  return sqlite.run(`UPDATE TWEETS_CONFIG SET ACCOUNT= "` + account + `", HASHTAG="` + hashtag + `", USED=` + used + `, ADS=` + ads + ` WHERE ID=1`)
}

let getUsed = async () => {
  return sqlite.get('SELECT USED FROM TWEETS_CONFIG WHERE ID=1')
}

module.exports = {
  getTweets, updateTweet, getConfig, editConfig, getUsed, getInAds, deleteTweets
}
