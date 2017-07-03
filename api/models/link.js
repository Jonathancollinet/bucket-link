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
  });

  Link.associate = function (models) {
    // Link.belongsTo(models.User, {
    //   foreignKey: 'user_id', as: 'user'
    // })
    Link.belongsTo(models.Bucket, {
      foreignKey: 'bucket_id', as: 'links',
    })
  };

  return Link;
};