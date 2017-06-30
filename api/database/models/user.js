module.exports = (sequelize, Datatype) => {

  const User = sequelize.define('users',
  {
    email: {
      type: Datatype.STRING
    },
    password: {
      type: Datatype.STRING
    }
  })
  return User

}