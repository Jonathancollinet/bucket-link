module.exports = function (sequelize, DataTypes) {
  const Bucket = sequelize.define('Bucket', {
    name: DataTypes.STRING,
    color: DataTypes.STRING,
  });

  Bucket.associate = function (models) {
    Bucket.hasMany(models.Link)
    Bucket.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      },
      onDelete: 'CASCADE'
    })
  };

  return Bucket;
};