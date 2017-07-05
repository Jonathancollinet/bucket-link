/*
    @author Antoine Chiny
    @github.com/TonyChG
    @email antoine.chiny@ynov.com
    @File: user.js

    @fileOverview Users (CRUD)
*/
'use strict';

module.exports = (express) => {
  const
    router = express.Router(),
    { User } = require('../../../models'),
    { setResponse } = require('../../../commons')

  router.get('/', (req, res) => {
    User.findAll().then(users => {
      setResponse(res, 'OK', users)
    }).catch(err => {
      console.error(err.message)
      setResponse(res, 'SERVER_ERROR')
    })
  })

  router.post('/', (req, res) => {
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