/*
    @author Antoine Chiny
    @github.com/TonyChG
    @email antoine.chiny@ynov.com
    @File: bucket.js

    @fileOverview Define Bucket MySQL data schema
    Create buckets table
*/

module.exports = (sequelize, Datatype) => {

  const Bucket = sequelize.define('buckets',
  {
    name: {
      type: Datatype.STRING
    }
  })
  return Bucket

}