/*
    @author Antoine Chiny
    @github.com/TonyChG
    @email antoine.chiny@ynov.com
    @File: bucket.js

    @fileOverview Buckets (CRUD)
*/

module.exports = (express) => {
  const
    router = express.Router(),
    { Bucket } = require('../../../models'),
    { isSet } = require('../../../commons')

  router.get('/', (req, res) => {
    Bucket.findAll().then(buckets => {
      res.json(buckets)
    }).catch(err => {
      console.error(err.message)
      res.sendStatus(500)
    })
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
    res.sendStatus(200)
  })

  router.post('/', (req, res) => {
    Bucket.create({
      'name': req.body.name
    }).then(data => {
      res.sendStatus(200)
    }).catch(err => {
      console.error(err.message)
      res.sendStatus(500)
    })
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