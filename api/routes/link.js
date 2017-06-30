/*
    @author Antoine Chiny
    @github.com/TonyChG
    @email antoine.chiny@ynov.com
    @File: link.js

    @fileOverview Link (CRUD)
*/

module.exports = (express) => {
  const router = express.Router(),
    { Link } = require('../database/')

  router.get('/', (req, res) => {
    Link.findAll().then(Links => {
      res.send(Links)
    }).catch(err => {
      console.error(err.message)
      res.sendStatus(500)
    })
  })

  return router
}