/*
    @author Antoine Chiny
    @github.com/TonyChG
    @email antoine.chiny@ynov.com
    @File: link.js

    @fileOverview Link (CRUD)
*/

module.exports = (express) => {
  const
    router = express.Router(),
    { Link } = require('../../../models'),
    { isSet } = require('../../../commons')

  router.get('/', (req, res) => {
    res.sendStatus(200)
  })

  return router
}