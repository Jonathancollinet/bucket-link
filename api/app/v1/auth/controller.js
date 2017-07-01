const
  { User } = require('../../../models')

module.exports = {

  signin: async (bodyData) => {
    const user = await User.findOne({ where: { email: bodyData.email }, raw: true })
    console.log('bodyData', bodyData);
    if (!user) {
      console.log('User not found.')
      return {
        error: true,
        data: {
          message: 'Email not found.'
        }
      }
    } else {
      if (User.compareHash(user, bodyData.password)) {
        // Authenticated
        console.log(`${user.email} authenticate.`)
        return {
          error: false,
          data: {
            user: { 
              id: user.id,
              email: user.email 
            }
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
    }
  }
}