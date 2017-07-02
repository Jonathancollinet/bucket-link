const 
  jwt = require('jsonwebtoken'),
  { secret_jwt } = require('../../../config/server')

module.exports = {
  isAuth(req, res, next) {
    const token = req.get('authorization'),
      cleanTkn = token.split(' ')[1]

    try {
      jwt.verify(cleanTkn, secret_jwt)
      next()
    } catch (err) {
      res.sendStatus(401)
    }
  }
}