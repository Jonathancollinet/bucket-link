'use strict';

const
  { randint } = require('../commons'),
  { randomBucket, genRandomObjTable } = require('./factories'),
  config = require('../config/seeds'),
  bcrypt = require('bcrypt-nodejs'),
  faker = require('faker'),
  models = require('../models')

module.exports = {
  up: async function (queryInterface, Sequelize) {
    const users = await models.User.findAll()
    return queryInterface.bulkInsert('Buckets', 
      genRandomObjTable(randomBucket, config.numberOfBucket, { users }), {})
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Buckets', null, {})
  }
}
