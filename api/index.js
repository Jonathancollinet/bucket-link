/*
    @author Antoine Chiny
    @github.com/TonyChG
    @email antoine.chiny@ynov.com
    @File: index.js

    @fileOverview Bucket-link API
    Start server with config routes and Sequelize
*/

const 
  { baseUrl, port } = require('./config/server'),
  express = require('express'),
  routes = require('./routes')(express),
  bodyParser = require('body-parser'),
  app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

app.use(`${baseUrl}`, routes)

app.listen(port, () => {
  console.log(`Server ON: PORT=${port}`)
})