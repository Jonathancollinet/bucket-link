module.exports = (express) => {
  const
    auth = express.Router(),
    jwt = require('jsonwebtoken'),
    { secret_jwt } = require('../../../config/server'),
    ctrl = require('./controller')

  auth.post('/', async (req, res) => {
    let response = await ctrl.signin(req.body);
    if (response.error) {
      res.sendStatus(401)
    } else {
      const profile = response.data;

      var token = jwt.sign(profile, secret_jwt);

      // Set Authorization header
      res.set('authorization', `JWT ${token}`)

      res.json({ token: token })
    }
  })

  auth.delete('/', async (req, res) => {
    res.removeHeader('authorization');
    res.json({ disconnected: true })
  })

  auth.get('/ping', async (req, res) => {
    const token = req.get('authorization')
    
    try {
      const cleanToken = token.split(' ')[1]
      jwt.verify(cleanToken, secret_jwt)
      res.json({ error: false, message: 'User is Authenticated.' })
      res.sendStatus(200)
    } catch (err) {
      res.json({ error: true, message: 'User is disconnected.' })
      res.sendStatus(400)
    }
  })

  return auth
}
