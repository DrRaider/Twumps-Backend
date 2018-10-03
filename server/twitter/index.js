const express = require('express')
const router = express.Router()
const twitter = require('./twitter')

// Return the last tweets
router.get('/', async (req, res, next) => {
  let used = await twitter.getUsed()
  if (!used) {
    try {
      res.send(await twitter.updateTweets())
    } catch (err) {
      return next(err)
    }
  } else {
    try {
      res.send(await twitter.updateTweetsHashtag())
    } catch (err) {
      return next(err)
    }
  }
})

// Return if twitter must be displayed in the ads panel or not
router.get('/ads', async (req, res, next) => {
  try {
    res.send(await twitter.getInAds())
  } catch (err) {
    return next(err)
  }
})

// Return twitter configuration
router.get('/config', async (req, res, next) => {
  try {
    res.send(await twitter.getConfig())
  } catch (err) {
    return next(err)
  }
})

router.post('/', async (req, res, next) => {
  let account = req.body.account

  let hashtag = req.body.hashtag

  let used = req.body.used

  let ads = req.body.ads
  try {
    let result = await twitter.editConfig(account, hashtag, used, ads).catch((err) => {
      throw err
    })
    if (!used) {
      await twitter.updateTweets().catch((err) => {
        throw err
      })
    } else {
      await twitter.updateTweetsHashtag().catch((err) => {
        throw err
      })
    }

    res.send(result)
  } catch (err) {
    return next(err)
  }
})

module.exports = router
