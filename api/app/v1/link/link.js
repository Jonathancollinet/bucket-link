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
  { isSet, setResponse } = require('../../../commons'),
  scrapper = require('../../../scrapper')

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

  async uncategorized(req, res) {
    const links = await Link.findAll({
      where: {
        BucketId: null
      },
      order: [
        ['createdAt', 'DESC']
      ]
    })
    setResponse(res, 'OK', links)
  },

  async create(req, res) {
    if (!isSet(req.body.url)) {
      setResponse(res, 'NO_CONTENT')
    } else {
      const metas = await scrapper(req.body.url).catch(err => {
        setResponse(res, 'INVALID_URL', {})
      })
      const
        user = getUserFromToken(req.get('authorization')),
        userModel = await User.findById(user.id)
      try {
        const link = await userModel.createLink({
          url: req.body.url,
          title: req.body.title || metas.title || '',
          description: req.body.description || metas.description || '',
          image: metas.image || ''
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
      setResponse(res, 'NO_CONTENT')
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
        if (isSet(req.body.url)) {
          const metas = await scrapper(req.body.url).catch(err => {
            setResponse(res, 'INVALID_URL', {})
          })
          link.update({
            'title': req.body.title || metas.title,
            'url': req.body.url,
            'description': req.body.description || metas.description,
            'image': metas.image
          })
          setResponse(res, 'OK', link)
        } else if (isSet(req.body.bucketId)) {
          // TODO SECU ?, check if bucketId has the good userId before update
          link.update({
            'BucketId': req.body.bucketId
          })
          setResponse(res, 'OK', link)
        } else {
          setResponse(res, 'NO_CONTENT')
        }
      }
    }
  }
}
