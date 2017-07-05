/*
    @author Antoine Chiny
    @github.com/TonyChG
    @email antoine.chiny@ynov.com
    @File: bucket.js

    @fileOverview Buckets (CRUD)
    GET     /               => All Buckets
    GET     /bucketId       => Bucket by id + 25 first links
    GET     /bucketId/links => Get links of bucket id
    POST    /               => Create new bucket (return newly create bucket)
    POST    /bucketId/links => Add new link to bucket (return newly create link)
    DELETE  /bucketId       => Delete bucket by id
    PATCH   /bucketId       => Update bucket by id
*/

const
  bucketCtrl = require('./bucket'),
  { isAuth } = require('../middlewares')

module.exports = (express) => {
  const router = express.Router()

  router.use(isAuth)

  router.get('/', bucketCtrl.index)
  router.get('/:bucketId', bucketCtrl.show)
  router.get('/:bucketId/links', bucketCtrl.getLinksByBucketId)
  router.post('/', bucketCtrl.create)
  router.post('/:bucketId/links', bucketCtrl.createLink)
  router.delete('/:bucketId', bucketCtrl.destroy)
  router.patch('/:bucketId', bucketCtrl.update)

  return router
}