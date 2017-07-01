'use strict';

const
  { randomUser, genRandomObjTable } = require('./factories'),
  config = require('../config/seeds')

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', 
      genRandomObjTable(randomUser, config.numberOfUser), {})
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {})
  }
};
