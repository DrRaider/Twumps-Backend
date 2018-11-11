const express = require('express')
const router = express.Router()
const nouns = require('./nouns')

router.get('/', async (req, res, next) => {
  try {
    res.send(await nouns.getCityList())
  } catch (err) {
    return next(err)
  }
})

module.exports = router
