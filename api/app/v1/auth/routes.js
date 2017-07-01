module.exports = (express) => {
  const
    auth = express.Router(),
    jwt = require('jsonwebtoken'),
    { secretJwt } = require('../../../config/server'),
    ctrl = require('./controller')

  auth.post('/', async (req, res) => {
    let response = await ctrl.signin(req.body)
    if (response.error) {
      res.sendStatus(401)
    } else {
      const profile = response.user

      var token = jwt.sign(profile, secretJwt)

      // Set Authorization header
      res.set('authorization', `JWT ${token}`)

      res.json({ token: token })
    }
  })

  return auth
}
