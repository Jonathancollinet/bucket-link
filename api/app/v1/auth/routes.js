module.exports = (express) => {
  const
    auth = express.Router(),
    jwt = require('jsonwebtoken'),
    { secret_jwt } = require('../../../config/server'),
    ctrl = require('./controller')

  auth.post('/', async (req, res) => {
    let response = await ctrl.signin(req.body);
    console.log(response);
    if (response.error) {
      res.sendStatus(401)
    } else {
      const profile = response.data;

      console.log('profile', profile);

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
    const token = req.get('authorization'),
      cleanToken = token.split(' ')[1]
    
    try {
      jwt.verify(cleanToken, secret_jwt)
      res.sendStatus(200)
    } catch (err) {
      res.sendStatus(400)
    }
  })

  return auth
}
