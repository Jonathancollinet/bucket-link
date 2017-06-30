/*
    @author Antoine Chiny
    @github.com/TonyChG
    @email antoine.chiny@ynov.com
    @File: link.js

    @fileOverview Define Link MySQL data schema
    Create links table
*/

module.exports = (sequelize, Datatype) => {

  const Link = sequelize.define('links',
  {
    url: {
      type: Datatype.STRING
    },
    name: {
      type: Datatype.STRING
    }
  })
  return Link

}