/*
    @author Antoine Chiny
    @github.com/TonyChG
    @email antoine.chiny@ynov.com
    @File: user.js

    @fileOverview Users (CRUD)
*/

module.exports = (express) => {
  const
    router = express.Router(),
    { User } = require('../../../models')

  router.get('/', (req, res) => {
    User.findAll().then(users => {
      res.send(users)
    }).catch(err => {
      console.error(err.message)
      res.sendStatus(500)
    })
  })

  router.post('/', (req, res) => {
    // TODO check if email exist before ?
    User.create({
      'email': req.body.email,
      'password': req.body.password
    }).then(data => {
      res.json({});
    }).catch(err => {
      console.error(err)
      res.sendStatus(500)
    })
  })

  router.get('/:userId', (req, res) => {
    if (!parseInt(req.params.userId)) {
      return res.sendStatus(500)
    }
  })

  return router
}