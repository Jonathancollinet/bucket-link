module.exports = (express) => {
  const
    auth = express.Router(),
    jwt = require('jsonwebtoken'),
    ctrl = require('./controller')

  auth.post('/', async (req, res) => {
    console.log("HIT");
    let response = await ctrl.signin(req.body);
    if (response.error) {
      res.sendStatus(401);
    } else {
      console.log("continue with socket auth ...");
    }
    res.sendStatus(200)
  })

  return auth
}
