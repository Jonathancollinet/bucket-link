module.exports = function (sequelize, DataTypes) {
  const Bucket = sequelize.define('Bucket', {
    name: DataTypes.STRING,
    color: DataTypes.STRING,
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    }
  });

  Bucket.associate = function (models) {
    Bucket.belongsTo(models.User, {
      foreignKey: 'id', as: 'buckets',
    })
    Bucket.hasMany(models.Link, {
      foreignKey: 'user_id', as: 'links', otherKey: 'id'
    })
  };

  return Bucket;
};