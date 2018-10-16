const express = require('express')
const router = express.Router()
const dataset = require('./dataset')

router.get('/retweets', async (req, res, next) => {
  try {
    res.send(await dataset.getAllRetweets())
  } catch (err) {
    return next(err)
  }
})

router.get('/tagcloud', async (req, res, next) => {
  try {
    res.send(await dataset.getTagCloud())
  } catch (err) {
    return next(err)
  }
})

router.post('/search', async (req, res, next) => {
  try {
    res.send(await dataset.getSearch(req.body.keyword))
  } catch (err) {
    return next(err)
  }
})
module.exports = router
