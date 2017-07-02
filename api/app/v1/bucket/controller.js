/*
    @author Antoine Chiny
    @github.com/TonyChG
    @email antoine.chiny@ynov.com
    @File: controller.js

    @fileOverview Buckets controller
*/

const
  { getUserFromToken } = require('../auth/controller'),
  { Bucket, Link } = require('../../../models'),
  { isSet } = require('../../../commons')

module.exports = {
  async index(req, res) {
    const user = getUserFromToken(req.get('authorization'))

    if (!user) {
      res.sendStatus(204)
    } else {
      const buckets = await Bucket.findAll({
        where: { user_id: user.id }
      })

      if (!buckets) {
        res.sendStatus(404)
      } else {
        res.json(buckets)
      }
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

      if (!bucket) {
        res.sendStatus(404)
      } else {
        const links = await Link.findAll({
          where: {
            bucket_id: req.params.bucketId
          }
        })

        if (!links) {
          res.sendStatus(404)
        } else {
          res.json(links)
        }
      }
    }
  },

  async create(req, res) {
    if (!isSet(req.body.name)) {
      res.sendStatus(204)
    } else {
      const user = getUserFromToken(req.get('authorization'))

      try {
        const
          newBucket = await Bucket.create({
            name: req.body.name,
            color: req.body.color,
            user_id: user.id
          })
        res.json(newBucket)
      } catch (err) {
        console.error(err)
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
              bucket_id: req.params.bucketId,
              user_id: user.id
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
    if (parseInt(req.param.bucketId)) {
      res.sendStatus(404)
    } else {
      const bucket = await Bucket.findById(req.params.bucketId)

      if (!bucket) {
        res.sendStatus(404)
      } else {
        if (!isSet(req.body.name) || !isSet(req.body.color)) {
          res.sendStatus(204)
        } else {
          try {
            bucket.updateAttributes({
              name: req.body.name,
              color: req.body.color
            })
            res.sendStatus(200)
          } catch (err) {
            res.sendStatus(404)
          }
        }
      }
    }
  }
}