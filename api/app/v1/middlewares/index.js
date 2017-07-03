const 
  jwt = require('jsonwebtoken'),
  { secret_jwt } = require('../../../config/server')

module.exports = {
  isAuth(req, res, next) {
    try {
      const token = req.get('authorization'),
      cleanTkn = token.split(' ')[1]
      jwt.verify(cleanTkn, secret_jwt)
      next()
    } catch (err) {
      res.sendStatus(401)
    }
  }
}