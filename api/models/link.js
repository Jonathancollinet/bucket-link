'use strict';

module.exports = function (sequelize, DataTypes) {
  var Link = sequelize.define('Link', {
    title: DataTypes.STRING,
    url: DataTypes.STRING,
    description: DataTypes.TEXT,
    image: DataTypes.STRING
  });

  Link.associate = function (models) {
    Link.belongsTo(models.User, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false
      }
    })
    Link.belongsTo(models.Bucket, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: true
      }
    })
  };

  return Link;
};