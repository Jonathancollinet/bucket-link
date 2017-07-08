/*
    @author Antoine Chiny
    @github.com/TonyChG
    @email antoine.chiny@ynov.com
    @File: admin.js

    @fileOverview Admin (CRUD)
    GET     /                       => TODO, Should get metrics of the actual process + count of entities
    GET     /users                  => Get All Users
    GET     /users/userId           => Get User (+ all buckets without links, but need count) by userId 
    GET     /buckets                => Get All Buckets
    GET     /buckets/bucketId       => Get Bucket (+ all links) by bucketId  
    GET     /links                  => Get All Links

    POST    /users                  => Create new user
    POST    /buckets                => Create new bucket
    POST    /links                  => Create new link

    PATCH   /users/userId           => Update user by userId
    PATCH   /buckets/bucketId       => Update bucket by bucketId
    PATCH   /links/linkId           => Update link by linkId

    DELETE  /users/userId           => Delete user by id
    DELETE  /buckets/bucketId       => Delete bucket by id
    DELETE  /links/linkId           => Delete link by id
*/
'use strict';

const
  adminCtrl = require('./admin'),
  { isAuth } = require('../middlewares')

module.exports = (express) => {
  const router = express.Router()

  // To Do: create a new middleware isAdmin and check user 'role' (user || admin)
  router.use(isAuth)

  router.get('/', adminCtrl.getGlobalMetrics)
  router.get('/users', adminCtrl.getUsers)
  router.get('/users/:id', adminCtrl.getUserByID)
  router.get('/buckets', adminCtrl.getBuckets)
  router.get('/buckets/:id', adminCtrl.getBucketByID)
  router.get('/links', adminCtrl.getLinks)

  router.post('/users', adminCtrl.createUser)
  router.post('/buckets', adminCtrl.createBucket)
  router.post('/links', adminCtrl.createLink)

  router.patch('/users/:id', adminCtrl.updateUserByID)
  router.patch('/buckets/:id', adminCtrl.updateBucketByID)
  router.patch('/links/:id', adminCtrl.updateLinkByID)
  
  router.delete('/users/:id', adminCtrl.deleteUserByID)
  router.delete('/buckets/:id', adminCtrl.deleteBucketByID)
  router.delete('/links/:id', adminCtrl.deleteLinkByID)

  return router
}