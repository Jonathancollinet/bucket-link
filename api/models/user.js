'use strict';
const bcrypt = require('bcrypt-nodejs')

const hasSecurePassword = (user, options, callback) => {
  // if (user.password !== user.password_confirmation) {

  // }
  bcrypt.hash(user.get('password'), 10, (err, hash,) => {
    if (err) callback(err)
    user.set('password', hash)
    return callback(null, options)
  })
}

module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      get() {
        return this.getDataValue('email')
      }
    },
    password: {
      type: DataTypes.STRING,
      get() {
        return this.getDataValue('password')
      }
    }
  }, {
    instanceMethods: {
      compareHash(password) {
        return bcrypt.compareSync(password, this.password)
      }
    }
  })

  User.associate = function (models) {
    User.hasMany(models.Bucket)
    User.hasMany(models.Link)
  }

  User.beforeCreate((user, options) => {
    user.password = bcrypt.hashSync(user.password)
  })

  User.beforeUpdate((user, options) => {
    if (user.password) {
      user.password = bcrypt.hashSync(user.password)
    }
  })

  User.compareHash = (user, reqHash) => {
    return bcrypt.compareSync(reqHash, user.password)
  }

  return User;
};