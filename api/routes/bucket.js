/*
    @author Antoine Chiny
    @github.com/TonyChG
    @email antoine.chiny@ynov.com
    @File: bucket.js

    @fileOverview Buckets (CRUD)
*/

module.exports = (express) => {
  const router = express.Router(),
    { Bucket } = require('../database/')

  router.get('/', (req, res) => {
    Bucket.findAll().then(buckets => {
      res.send(buckets)
    }).catch(err => {
      console.error(err.message)
      res.sendStatus(500)
    })
  })

  return router
}