module.exports = (express) => {
  const
    auth = express.Router(),
    jwt = require('jsonwebtoken'),
    secretJwt = require('../../../config/server').secret_jwt,
    ctrl = require('./controller')

  auth.post('/', async (req, res) => {
    console.log("HIT");
    let response = await ctrl.signin(req.body);
    if (response.error) {
      res.sendStatus(401);
    } else {
      console.log("continue with socket auth ...");

    let profile = {
      user: {
        email: 'test@gmail.com'
      }
    }

    var token = jwt.sign(profile, secretJwt);

     // Set Authorization header
    res.set('authorization', `JWT ${token}`);

    res.json({token: token});

    }
  })

  return auth
}
