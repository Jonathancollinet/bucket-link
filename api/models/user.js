'use strict';
module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define('User', {
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
      classMethods: {
        associate: function (models) {
          User.hasMany(models.Bucket)
          User.hasMany(models.Link)
        }
      }
    });
  return User;
};