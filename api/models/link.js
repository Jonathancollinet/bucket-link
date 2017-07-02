'use strict';
module.exports = function (sequelize, DataTypes) {
  var Link = sequelize.define('Link', {
    title: DataTypes.STRING,
    url: DataTypes.STRING,
    description: DataTypes.TEXT,
    bucket_id: {
      type: DataTypes.INTEGER,
      allownull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    }
  }, {
      classMethods: {
        associate: function (models) {
          Link.belongsTo(models.Bucket, {
            onDelete: 'CASCADE',
            foreignKey: 'bucket_id'
          })
          Link.belongsTo(models.User, {
            onDelete: 'CASCADE',
            foreignKey: 'user_id'
          })
        }
      }
    });
  return Link;
};