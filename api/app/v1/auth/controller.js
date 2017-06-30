const
  { User } = require('../../../models')

module.exports = {

  signin: async (bodyData) => {

    User.findOne({ where: { email: bodyData.email } }).then(user => {
      if (User.compareHash(user, bodyData.password)) {
        // Authenticated
        console.log(`${user.email} authenticate.`)
        return {
          error: false,
          data: {
            email: user.email
          }
        }
      } else {
        // Valid email, Wrong password
        console.log(`Wrong password with ${user.email}.`)
        return {
          error: true,
          data: {
            message: `Wrong password with ${user.email}`
          }
        }
      }
    }).catch(err => {
      console.log('User not found.')
      return {
        error: true,
        data: {
          message: 'Email not found.'
        }
      }
    })
  }

}