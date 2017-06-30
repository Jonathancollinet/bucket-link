/*
    @author Antoine Chiny
    @github.com/TonyChG
    @email antoine.chiny@ynov.com
    @File: link.js

    @fileOverview Link (CRUD)
*/

module.exports = (express) => {
  const router = express.Router(),
    { Link } = require('../models')

  router.get('/', (req, res) => {
    Link.findAll().then(links => {
      res.send(links)
    }).catch(err => {
      console.error(err.message)
      res.sendStatus(500)
    })
  })

  return router
}