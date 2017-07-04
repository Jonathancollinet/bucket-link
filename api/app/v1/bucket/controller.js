/*
    @author Antoine Chiny
    @github.com/TonyChG
    @email antoine.chiny@ynov.com
    @File: controller.js

    @fileOverview Buckets controller
*/

const
  { getUserFromToken } = require('../auth/controller'),
  { User, Bucket, Link } = require('../../../models'),
  { isSet, setResponse } = require('../../../commons')

module.exports = {
  async index(req, res) {
    const user = getUserFromToken(req.get('authorization'))

    if (!user) {
      setResponse(res, 'NOT_FOUND')
    } else {
      const connectedUser = await User.findById(user.id)
      const userBuckets = await connectedUser.getBuckets()
      setResponse(res, 'OK', userBuckets)
    }
  },

  async show(req, res) {
    if (!parseInt(req.params.bucketId)) {
      setResponse(res, 'NOT_FOUND')
    } else {
      const bucket = await Bucket.findById(req.params.bucketId)
      if (!bucket) {
        setResponse(res, 'NOT_FOUND')
      } else {
        setResponse(res, 'OK', bucket)
      }
    }
  },

  async getLinksByBucketId(req, res) {
    if (!parseInt(req.params.bucketId)) {
      setResponse(res, 'NOT_FOUND')
    } else {
      const bucket = await Bucket.findById(req.params.bucketId)
      const links = await bucket.getLinks()

      if (!bucket) {
        setResponse(res, 'NOT_FOUND')
      } else {
        setResponse(res, 'OK', links)
      }
    }
  },

  async create(req, res) {
    if (!isSet(req.body.name)) {
      setResponse(res, 'NO_CONTENT')
    } else {
      const
        user = getUserFromToken(req.get('authorization')),
        userModel = await User.findById(user.id)
      try {
        const bucket = await userModel.createBucket({
          name: req.body.name,
          color: req.body.color,
        })
        setResponse(res, 'OK', bucket)
      } catch (err) {
        setResponse(res, 'NOT_FOUND')
      }
    }
  },

  async createLink(req, res) {
    if (!parseInt(req.params.bucketId)) {
      setResponse(res, 'NOT_FOUND')
    } else {
      const bucket = await Bucket.findById(req.params.bucketId)

      if (!bucket) {
        setResponse(res, 'NOT_FOUND')
      } else {
        if (!isSet(req.body.url) || !isSet(req.body.title)) {
          setResponse(res, 'NO_CONTENT')
        } else {
          const user = getUserFromToken(req.get('authorization'))

          try {
            const newLink = await bucket.createLink({
              url: req.body.url,
              title: req.body.title,
              description: req.body.description,
              UserId: user.id
            })
            setResponse(res, 'OK', newLink)
          } catch (err) {
            setResponse(res, 'SERVER_ERROR')
          }
        }
      }
    }
  },

  async destroy(req, res) {
    if (!parseInt(req.params.bucketId)) {
      setResponse(res, 'NOT_FOUND')
    } else {
      const bucket = await Bucket.findById(req.params.bucketId)

      if (!bucket) {
        setResponse(res, 'NOT_FOUND')
      } else {
        bucket.destroy()
        setResponse(res, 'OK')
      }
    }
  },

  async update(req, res) {
    const user = getUserFromToken(req.get('authorization'))

    if (!parseInt(req.params.bucketId)) {
      setResponse(res, 'NOT_FOUND')
    } else {
      const bucket = await Bucket.findById(req.params.bucketId)

      if (!bucket) {
        setResponse(res, 'NOT_FOUND')
      } else {
        if (isSet(req.body.name)) {
          const color = req.body.color ? req.body.color : bucket.color
          bucket.update({
            'name': req.body.name,
            'color': color
          })
          setResponse(res, 'OK', bucket)
        } else {
          setResponse(res, 'NO_CONTENT')
        }
      }
    }
  }
}