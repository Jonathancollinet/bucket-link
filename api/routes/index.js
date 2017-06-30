/*
    @author Antoine Chiny
    @github.com/TonyChG
    @email antoine.chiny@ynov.com
    @File: index.js

    @fileOverview Exports all routes from this folder
*/

module.exports = (express) => {
  const 
    user = require('./user')(express),
    bucket = require('./bucket.js')(express),
    link = require('./link')(express)

  return {
    user,
    bucket,
    link
  }
}