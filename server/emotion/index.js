const express = require('express')
const router = express.Router()
const emotion = require('./emotion')

router.get('/', async (req, res, next) => {
  try {
    res.send(await emotion.getEmotion())
  } catch (err) {
    return next(err)
  }
})

router.get('/set', async (req, res, next) => {
  try {
    res.send(await emotion.setEmotion())
  } catch (err) {
    return next(err)
  }
})
module.exports = router
