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
      onDelete: 'CASCADE',
      foreignKey: 'user_id',
      as: 'user'
    })
    Bucket.hasMany(models.Link, {
      foreignKey: 'bucket_id',
      as: 'links'
    })
  };

  return Bucket;
};