const express = require('express')
const router = express.Router()
const timeline = require('./timeline')

router.get('/', async (req, res, next) => {
  try {
    res.send(await timeline.getRetweet())
  } catch (err) {
    return next(err)
  }
})

module.exports = router
