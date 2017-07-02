/*
    @author Antoine Chiny
    @github.com/TonyChG
    @email antoine.chiny@ynov.com
    @File: bucket.js

    @fileOverview Buckets (CRUD)
    GET     /               => All Buckets
    GET     /bucketId       => Bucket by id
    GET     /bucketId/links => Get links of bucket id
    POST    /               => Create new bucket (return newly create bucket)
    POST    /bucketId/links => Add new link to bucket (return newly create link)
    DELETE  /bucketId       => Delete bucket by id
    PATCH   /bucketId       => Update bucket by id
*/

module.exports = (express) => {
  const
    router = express.Router(),
    { Bucket, Link } = require('../../../models'),
    { isSet } = require('../../../commons'),
    { isAuth } = require('../middlewares')


  router.use(isAuth)

  router.get('/', async (req, res) => {
    const buckets = await Bucket.findAll()
    if (!buckets) {
      res.sendStatus(404)
    } else {
      res.json(buckets)
    }
  })

  router.get('/:bucketId', async (req, res) => {
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
  })

  router.get('/:bucketId/links', async (req, res) => {
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
  })

  router.post('/', async (req, res) => {
    if (!isSet(req.body.name) || !isSet(req.body.color)) {
      res.sendStatus(204)
    } else {
      try {
        const
          newBucket = await Bucket.create({
            name: req.body.name,
            color: req.body.color
          }),
          decoded = jwt.decode(req.get('authorization'))
        console.log(decoded)
        res.json(newBucket)
      } catch (err) {
        console.error(err)
        res.sendStatus(404)
      }
    }
  })

  router.post('/:bucketId/links', async (req, res) => {
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
          try {
            const newLink = await Link.create({
              url: req.body.url,
              title: req.body.title,
              description: req.body.description,
              bucket_id: req.params.bucketId
            })
            res.json(newLink)
          } catch (err) {
            console.error(err)
            res.sendStatus(500)
          }
        }
      }
    }
  })

  router.delete('/:bucketId', async (req, res) => {
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
  })

  router.patch('/:bucketId', async (req, res) => {
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
  })

  return router
}