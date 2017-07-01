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
    { Bucket } = require('../../../models')

  router.get('/', (req, res) => {
    Bucket.findAll().then(buckets => {
      res.json(buckets)
    }).catch(err => {
      console.error(err.message)
      res.sendStatus(500)
    })
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
      return res.sendStatus(404)
    } else {
      const bucket = await Bucket.findById(req.params.bucketId)
      if (!bucket) {
        return res.sendStatus(404)
      } else {
        bucket.destroy()
        return res.sendStatus(200)
      }
    }
  })

  router.patch('/:bucketId', async (req, res) => {
    console.log(`Patch Bucket id: ${req.params.bucketId}.`)
    if (!parseInt(req.param.bucketId)) {
      return res.sendStatus(404)
    } else {
      const bucket = await Bucket.findById(req.params.bucketId)
      if (!bucket) {
        return res.sendStatus(404)
      } else {
        console.log(bucket)
        if (!req.params.name || !req.params.color) {
          return res.sendStatus(204)
        } else {
          // try {
          //   Bucket.update(
          //     {
          //       name: req.params.name.toString(),
          //       color: req.params.color.toString()
          //     }
          //   )
          //   return res.sendStatus(200)
          // } catch (err) {
          //   return res.sendStatus(404)
          // }
        }
      }
    }
  })

  return router
}