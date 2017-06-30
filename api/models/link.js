'use strict';
module.exports = function (sequelize, DataTypes) {
  var Link = sequelize.define('Link', {
    title: DataTypes.STRING,
    url: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {
      classMethods: {
        associate: function (models) {
          Link.belongsTo(models.Bucket, {
            onDelete: 'CASCADE',
            foreignKey: {
              allowNull: false
            }
          })
          Link.belongsTo(models.User, {
            onDelete: 'CASCADE',
            foreignKey: {
              allowNull: false
            }
          })
        }
      }
    });
  return Link;
};