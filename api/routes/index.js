/*
    @author Antoine Chiny
    @github.com/TonyChG
    @email antoine.chiny@ynov.com
    @File: index.js

    @fileOverview Exports all routes from this folder
*/

module.exports = (express) => {
  const api = express.Router()

  api.use('/users', require('./user')(express))
  api.use('/buckets', require('./bucket')(express))
  api.use('/links', require('./link')(express))

  return api
}