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
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
