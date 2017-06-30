module.exports = (express) => {
  const
    auth = express.Router(),
    jwt = require('jsonwebtoken'),
    ctrl = require('./controller')

  auth.post('/', (req, res) => {
    
    res.sendStatus(200)
  })

  return auth
}
