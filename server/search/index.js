const express = require('express')
const router = express.Router()
const search = require('./search')

router.post('/', async (req, res, next) => {
  try {
    res.send(await search.getSearch(req.body.keyword))
  } catch (err) {
    return next(err)
  }
})
module.exports = router
