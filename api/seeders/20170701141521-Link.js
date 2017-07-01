'use strict';

const
  { randomLink, genRandomObjTable } = require('./factories'),
  config = require('../config/seeds'),
  models = require('../models')

module.exports = {
  up: async function (queryInterface, Sequelize) {
    const 
      users = await models.User.findAll(),
      buckets = await models.Bucket.findAll()
    
    return queryInterface.bulkInsert('Links',
      genRandomObjTable(randomLink, config.numberOfLink, { users, buckets }), {})
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Links', null, {})
  }
};
