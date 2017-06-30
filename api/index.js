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
  app = require('./app/v1')

const server = app.listen(port, () => {
  console.log(`Server ON port: ${port}`)
})

socketApp(server)
