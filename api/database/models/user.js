/*
    @author Antoine Chiny
    @github.com/TonyChG
    @email antoine.chiny@ynov.com
    @File: user.js

    @fileOverview Define User MySQL data schema
    Create users table
*/


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