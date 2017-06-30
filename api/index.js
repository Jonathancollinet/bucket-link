/*
    @author Antoine Chiny
    @github.com/TonyChG
    @email antoine.chiny@ynov.com
    @File: index.js

    @fileOverview Bucket-link API
    Start server with config routes and Sequelize
*/

const 
  port = require('./config/server').port,
  express = require('express'),
  routes = require('./routes')(express),
  app = express()

// app.use(express.static(''))

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

app.use('/users', routes.user)
app.use('/buckets', routes.bucket)
app.use('/links', routes.link)

app.listen(port, () => {
  console.log(`Server ON: PORT=${port}`)
})