/*
    @author Antoine Chiny
    @github.com/TonyChG
    @email antoine.chiny@ynov.com
    @File: index.js

    @fileOverview 
*/

const 
  express = require('express'),
  bodyParser = require('body-parser'),
  app = express()
  api = express.Router(),

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

api.use('/users', require('./user/routes')(express))
api.use('/buckets', require('./bucket/routes')(express))
api.use('/links', require('./link/routes')(express))
api.use('/auth', require('./auth/routes')(express))

app.use('/v1', api)

module.exports =  app

