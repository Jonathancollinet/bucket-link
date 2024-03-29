'use strict';

const
  { User } = require('../../../models'),
  { secret_jwt } = require('../../../config/server'),
  jwt = require('jsonwebtoken')

module.exports = {
  signin: async (bodyData) => {
    const user = await User.findOne({ where: { email: bodyData.email }, raw: true })
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
        console.log(`Wrong password with ${user.email}.`)
        return {
          error: true,
          data: {
            message: `Wrong password with ${user.email}`
          }
        }
      }
    }
  },

  getUserFromToken(token) {
    const cleanTkn = token.split(' ')[1]
    return jwt.decode(cleanTkn).user
  }
}