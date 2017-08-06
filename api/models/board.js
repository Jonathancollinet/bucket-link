module.exports = function (sequelize, DataTypes) {
  const Board = sequelize.define('Board', {
    name: DataTypes.STRING
  
  });

  Board.associate = function (models) {
    Board.hasMany(models.Bucket)
    Board.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      },
      onDelete: 'CASCADE'
    })
  };

  return Board;
};