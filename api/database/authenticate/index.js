
const Sequelize = require('sequelize'),
  cfg = require('../../config/database')

const sequelize = new Sequelize(
  `${cfg.dialect}://${cfg.username}:${cfg.password}@${cfg.host}:${cfg.port}/${cfg.dbname}`
  )

module.exports = sequelize