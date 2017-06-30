const sequelize = require('./authenticate'),
  DataType = require('sequelize')

module.exports = {
  User: require('./models/user')(sequelize, DataType),
  Bucket: require('./models/bucket')(sequelize, DataType),
  Link: require('./models/link')(sequelize, DataType)
}