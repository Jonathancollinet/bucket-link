module.exports = function (sequelize, DataTypes) {
  const Board = sequelize.define('Board', {
    name: DataTypes.STRING
  
  });

  Board.associate = function (models) {
    Board.hasMany(models.Bucket)
    // owner
    Board.belongsTo(models.User, {
      as: 'Owner',
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    })
    // contributors
     Board.belongsToMany(models.User, {
      through: models.UserBoard,
      as: 'Contributors',
      foreignKey: 'boardId',
      onDelete: 'CASCADE'
    })
  };

  return Board;
};