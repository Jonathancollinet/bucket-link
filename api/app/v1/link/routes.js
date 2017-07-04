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
    { isSet, setResponse } = require('../../../commons')

  router.get('/', (req, res) => {
    setResponse(res)
  })

  return router
}