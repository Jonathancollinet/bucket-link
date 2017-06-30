const { User } = require('../../../models')

module.exports = {
  signin: async (bodyData) => {
    console.log(bodyData.email, bodyData.password);


    return { error: false, data: {} };
  }
}