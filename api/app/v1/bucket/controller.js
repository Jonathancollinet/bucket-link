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
  { isSet } = require('../../../commons')

module.exports = {
  async index(req, res) {
    const user = getUserFromToken(req.get('authorization'))

    if (!user) {
      res.sendStatus(401)
    } else {
      const connectedUser = await User.findById(user.id)
      const userBuckets = await connectedUser.getBuckets()
      res.json(userBuckets)
    }
  },

  async show(req, res) {
    if (!parseInt(req.params.bucketId)) {
      res.sendStatus(404)
    } else {
      const bucket = await Bucket.findById(req.params.bucketId)
      if (!bucket) {
        res.sendStatus(404)
      } else {
        res.json(bucket)
      }
    }
  },

  async getLinksByBucketId(req, res) {
    if (!parseInt(req.params.bucketId)) {
      res.sendStatus(404)
    } else {
      const bucket = await Bucket.findById(req.params.bucketId)
      const links = await bucket.getLinks()

      if (!bucket) {
        res.sendStatus(404)
      } else {
        if (links) {
          res.json(links)
        } else {
          res.sendStatus(204)
        }
      }
    }
  },

  async create(req, res) {
    if (!isSet(req.body.name)) {
      res.sendStatus(204)
    } else {
      const 
        user = getUserFromToken(req.get('authorization')),
        userModel = await User.findById(user.id)
      try {
        const bucket = await userModel.createBucket({
          name: req.body.name,
          color: req.body.color,
        })
        res.json(bucket)
      } catch (err) {
        res.sendStatus(404)
      }
    }
  },

  async createLink(req, res) {
    if (!parseInt(req.params.bucketId)) {
      res.sendStatus(404)
    } else {
      const bucket = await Bucket.findById(req.params.bucketId)

      if (!bucket) {
        res.sendStatus(404)
      } else {
        if (!isSet(req.body.url) || !isSet(req.body.title)) {
          res.sendStatus(204)
        } else {
          const user = getUserFromToken(req.get('authorization'))

          try {
            const newLink = await Link.create({
              url: req.body.url,
              title: req.body.title,
              description: req.body.description,
              bucketId: req.params.bucketId,
              userId: user
            })
            res.json(newLink)
          } catch (err) {
            res.sendStatus(500)
          }
        }
      }
    }
  },

  async destroy(req, res) {
    if (!parseInt(req.params.bucketId)) {
      res.sendStatus(404)
    } else {
      const bucket = await Bucket.findById(req.params.bucketId)

      if (!bucket) {
        res.sendStatus(404)
      } else {
        bucket.destroy()
        res.sendStatus(200)
      }
    }
  },

  async update(req, res) {
    const user = getUserFromToken(req.get('authorization'))

    if (!parseInt(req.params.bucketId)) {
      res.sendStatus(404)
    } else {
      const bucket = await Bucket.findById(req.params.bucketId)

      if (!bucket) {
        res.sendStatus(404)
      } else {
        if (isSet(req.body.name)) {
          const color = req.body.color ? req.body.color : bucket.color
          bucket.update({
            'name': req.body.name,
            'color': color
          })
          res.json(bucket)
        } else {
          res.sendStatus(204)
        }
      }
    }
  }
}