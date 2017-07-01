module.exports = (express) => {
  const
    auth = express.Router(),
    jwt = require('jsonwebtoken'),
    secretJwt = require('../../../config/server').secret_jwt,
    ctrl = require('./controller')

  auth.post('/', async (req, res) => {
    let response = await ctrl.signin(req.body);
    console.log(response);
    if (response.error) {
      res.sendStatus(401)
    } else {
      const profile = response.data;

      console.log('profile', profile);

      var token = jwt.sign(profile, secretJwt);

      // Set Authorization header
      res.set('authorization', `JWT ${token}`)

      res.json({ token: token })
    }
  })

  auth.delete('/', async (req, res) => {
    res.removeHeader('authorization');
    res.json({ disconnected: true })
  });

  auth.get('/ping', async (req, res) => {
    // tODO, must validate a token
    res.sendStatus(400);
  });

  return auth
}
