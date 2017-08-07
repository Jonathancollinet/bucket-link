module.exports = function (sequelize, DataTypes) {
  const UserBoard = sequelize.define('UserBoard', {
    state: DataTypes.STRING
  });

  UserBoard.associate = function (models) {
    // UserBoard.hasMany(models.Board)
    // UserBoard.hasMany(models.User);
  };

  return UserBoard;
};