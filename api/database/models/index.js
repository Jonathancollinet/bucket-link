const sequelize = require('../authenticate'),
  Sequelize = require('sequelize'),
  User = require('./user')(sequelize, Sequelize)

module.exports = {
  User: User
}