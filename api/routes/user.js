/*
    @author Antoine Chiny
    @github.com/TonyChG
    @email antoine.chiny@ynov.com
    @File: user.js

    @fileOverview Users (CRUD)
*/

module.exports = (express) => {
  const router = express.Router(),
    { User } = require('../database/')

  router.get('/', (req, res) => {
    User.findAll().then(users => {
      res.send(users)
    }).catch(err => {
      console.error(err.message)
      res.sendStatus(500)
    })
  })

  return router
}