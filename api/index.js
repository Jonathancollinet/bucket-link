/*
    @author Antoine Chiny
    @github.com/TonyChG
    @email antoine.chiny@ynov.com
    @File: index.js

    @fileOverview Bucket-link API
    Start server with config routes and Sequelize
*/

const
  { port } = require('./config/server'),
  { socketApp } = require('./sockets'),
  app = require('./app/v1'),
  serverHttp = require('http').createServer(app);

serverHttp.listen(port, () => {
  console.log(`ServerHTTP ON port: ${port}`)
})

socketApp(serverHttp)
