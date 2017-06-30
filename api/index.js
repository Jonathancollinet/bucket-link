
const 
  port = require('./config/server').port,
  { User } = require('./database/models'),
  express = require('express'),
  app = express()

// app.use(express.static(''))

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

app.get('/', (req, res) => {
  User.findAll().then(users => {
    console.log(users)
  })
  res.sendStatus(200)
})

app.listen(port, () => {
  console.log(`Server ON: PORT=${port}`)
})