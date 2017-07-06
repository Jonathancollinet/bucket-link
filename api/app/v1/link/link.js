/*
    @author Antoine Chiny
    @github.com/TonyChG
    @email antoine.chiny@ynov.com
    @File: controller.js

    @fileOverview Links Controller
*/
'use strict';

const
  { getUserFromToken } = require('../auth/auth'),
  { User, Bucket, Link } = require('../../../models'),
  { isSet, setResponse } = require('../../../commons')

module.exports = {
  async index(req, res) {
    const user = getUserFromToken(req.get('authorization'))

    if (!user) {
      setResponse(res, 'UNAUTHORIZED')
    } else {
      const links = await Link.findAll({
        limit: 50,
        order: [
          ['createdAt', 'DESC']
        ],
        attributes: { exclude: ['UserId'] }
      })
      setResponse(res, 'OK', links)
    }
  },

  async show(req, res) {
    const _id = parseInt(req.params.linkId)
    if (!_id) {
      setResponse(res, 'NOT_FOUND')
    } else {
      const link = await Link.findById(_id, {
        attributes: { exclude: ['BucketId'] }
      })
      if (!link) {
        setResponse(res, 'NOT_FOUND')
      } else {
        setResponse(res, 'OK', link)
      }
    }
  },

  async create(req, res) {
    if (!isSet(req.body.url) || !isSet(req.body.title)) {
      setResponse(res, 'NO_CONTENT')
    } else {
      const
        user = getUserFromToken(req.get('authorization')),
        userModel = await User.findById(user.id),
        description = req.body.description ? req.body.description : ''
      try {
        const link = await userModel.createLink({
          url: req.body.url,
          title: req.body.title,
          description: description
        })
        setResponse(res, 'OK', link)
      } catch (err) {
        setResponse(res, 'NOT_FOUND')
      }
    }
  },

  async destroy(req, res) {
    const _id = parseInt(req.params.linkId)
    if (!_id) {
      setResponse(res ,'NO_CONTENT')
    } else {
      Link.findById(_id).then(link => {
        if (!link) {
          setResponse(res, 'NOT_FOUND')
        } else {
          return link.destroy()
        }
      }).then(() => {
        setResponse(res)
      })
    }
  },

  async update(req, res) {
    const user = getUserFromToken(req.get('authorization'))

    if (!parseInt(req.params.linkId)) {
      setResponse(res, 'NOT_FOUND')
    } else {
      const link = await Link.findById(req.params.linkId)
      if (!link) {
        setResponse(res, 'NOT_FOUND')
      } else {
        if (isSet(req.body.url) && isSet(req.body.title)) {
          link.update({
            'title': req.body.title,
            'url': req.body.url
          })
          setResponse(res, 'OK', link)
        } else {
          setResponse(res, 'NO_CONTENT')
        }
      }
    }
  }
}
