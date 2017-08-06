'use strict';

const
  { randomBoard, genRandomObjTable } = require('./factories'),
  config = require('../config/seeds'),
  models = require('../models')

module.exports = {
  up: async function (queryInterface, Sequelize) {
   const users = await models.User.findAll()
    return queryInterface.bulkInsert('Boards', 
      genRandomObjTable(randomBoard, config.numberOfBoard, { users }), {})
  },

  down: function (queryInterface, Sequelize) {
   return queryInterface.bulkDelete('Boards', null, {})
  }
};
