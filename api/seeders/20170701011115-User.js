'use strict';

const
  { numberOfUsers, bucketsPerUser, linksPerBucket } = require('../config/seeds'),
  faker = require('faker')

module.exports = {
  up: function (queryInterface, Sequelize) {
    const randomUsers = []

    for (let i = 0, len = numberOfUsers; i < len; i++) {
      randomUsers.push({
        email: faker.internet.email(),
        password: 'password'
      })
    }
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
}
