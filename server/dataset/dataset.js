const datasetDao = require('./dataset.dao')
const natural    = require('natural')

const getAllRetweets = async () => {
  await datasetDao.getAllRetweets()
    .then((data) => {
      // TODO: transform date to Date object
      return data
    })
    .catch((err) => {
      throw err
    })
}

const getTagCloud = async () => {
	datasetDao.getAllContentTweets().then(function(res) { 
		console.log(res)
	})

	// console.log(tweets)
	// tweets.forEach(function(tweet) {
	// 	console.log(tweet)
	// })

	// stemmer = natural.PorterStemmer;
	// var stem = stemmer.stem('stems');
	// console.log(stem);
	return tweets
}

module.exports = {
  getAllRetweets, getTagCloud
}
