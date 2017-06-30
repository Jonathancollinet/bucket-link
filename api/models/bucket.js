'use strict';
module.exports = function (sequelize, DataTypes) {
  var Bucket = sequelize.define('Bucket', {
    name: DataTypes.STRING,
    color: DataTypes.STRING
  }, {
      classMethods: {
        associate: function (models) {
          Bucket.hasMany(models.Link)
          Bucket.belongsTo(models.User, {
            onDelete: 'CASCADE',
            foreignKey: {
              allowNull: false
            }
          })
        }
      }
    });
  return Bucket;
};