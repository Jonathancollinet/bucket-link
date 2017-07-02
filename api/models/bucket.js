'use strict';
module.exports = function (sequelize, DataTypes) {
  var Bucket = sequelize.define('Bucket', {
    name: DataTypes.STRING,
    color: DataTypes.STRING,
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    }
  }, {
      classMethods: {
        associate: function (models) {
          Bucket.belongsTo(models.User, {
            onDelete: 'CASCADE',
            foreignKey: {
              allowNull: false
            }
          })
          Bucket.hasMany(model.Link)
        }
      }
    });
  return Bucket;
};