module.exports = (express) => {
  const
    auth = express.Router(),
    jwt = require('jsonwebtoken'),
    { secret_jwt } = require('../../../config/server'),
    { getUserFromToken } = require('./controller'),
    { setResponse } = require('../../../commons'),
    ctrl = require('./controller')

  auth.post('/', async (req, res) => {
    let response = await ctrl.signin(req.body);
    if (response.error) {
      setResponse(res, 'UNAUTHORIZED')
    } else {
      const profile = response.data;

      var token = jwt.sign(profile, secret_jwt);

      // Set Authorization header
      res.set('authorization', `JWT ${token}`)

      setResponse(res, 'OK', { token })
    }
  })

  auth.delete('/', async (req, res) => {
    res.removeHeader('authorization');
    setResponse(res, 'DISCONNECTED', { disconnected: true })
  })

  auth.get('/ping', async (req, res) => { 
    const token = req.get('authorization')
    try {
      const cleanToken = token.split(' ')[1]
      jwt.verify(cleanToken, secret_jwt, function(err, decoded) {
        setResponse(res, 'AUTHENTICATED', decoded)
      })
    } catch (err) {
      setResponse(res, 'UNAUTHORIZED')
    }
  })

  return auth
}
