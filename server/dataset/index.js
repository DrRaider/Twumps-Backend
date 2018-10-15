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

module.exports = router
