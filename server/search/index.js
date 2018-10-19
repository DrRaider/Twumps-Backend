const express = require('express')
const router = express.Router()
const dataset = require('./search')

router.post('/', async (req, res, next) => {
  try {
    res.send(await dataset.getSearch(req.body.keyword))
  } catch (err) {
    return next(err)
  }
})
module.exports = router
