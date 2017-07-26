/*
    @author Antoine Chiny
    @github.com/TonyChG
    @email antoine.chiny@ynov.com
    @File: user.js

    @fileOverview 
*/

const
  transport = require('../../../commons/mail'),
  templates = require('../../../templates/mails'),
  { getUserFromToken } = require('../auth/auth'),
  { User, Bucket, Link } = require('../../../models'),
  { isSet, setResponse } = require('../../../commons')

module.exports = {
  async index(req, res) {
    const user = getUserFromToken(req.get('authorization'))

    if (!user) {
      setResponse(res, 'UNAUTHORIZED')
    } else {
      const connectedUser = await User.findById(user.id, {
        attributes: ['email', 'id', 'firstname', 'createdAt', 'updatedAt']
      })
      if (!connectedUser) {
        setResponse(res, 'NOT_FOUND')
      } else {
        setResponse(res, 'OK', connectedUser)
      }
    }
  },

  async show(req, res) {
    setResponse(res)
  },

  async create(req, res) {
    if (!isSet(req.body.email) && !isSet(req.body.password)) {
      setResponse(res, 'NO_CONTENT')
    } else {
      const user = await User.find({
        where: {
          email: req.body.email.toString()
        }
      })
      if (!!user) {
        setResponse(res, 'USER_ALRDY_EXIST')
      } else {
        try {
          const newUser = await User.create({
            email: req.body.email,
            password: req.body.password,
            role: 'user',
            firstname: req.body.firstname
          })
          transport.sendMail(templates.createUser(newUser), (err, info) => {
            if (err) {
              setResponse(res, 'SERVER_ERROR')
            }
            setResponse(res)
          })
          setResponse(res, 'OK', {
            'email': newUser.email
          })
        } catch (err) {
          setResponse(res, 'SERVER_ERROR')
        }
      }
    }
  },

  async destroy(req, res) {
    setResponse(res)
  },

  async update(req, res) {
    setResponse(res)
  },

  async reset(req, res) {

  }
}
