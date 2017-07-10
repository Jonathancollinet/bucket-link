/*
    @author Antoine Chiny
    @github.com/TonyChG
    @email antoine.chiny@ynov.com
    @File: link.js

    @fileOverview Link (CRUD)
    GET     /         => 50 most recents links of all buckets
    GET     /linkId   => Bucket by id
    POST    /         => Create new link without bucket (return newly create link)
    DELETE  /linkId   => Delete bucket by id
    PATCH   /linkId   => Update bucket by id
*/
'use strict';

const
  linkCtrl = require('./link'),
  { isAuth } = require('../middlewares')

module.exports = (express) => {
  const router = express.Router()

  router.use(isAuth)

  router.get('/', linkCtrl.index)
  router.get('/:linkId', linkCtrl.show)
  router.get('/recent/uncategorized', linkCtrl.uncategorized)
  router.post('/', linkCtrl.create)
  router.delete('/:linkId', linkCtrl.destroy)
  router.patch('/:linkId', linkCtrl.update)
  router.post('/scrapper', linkCtrl.scrappe)

  return router
}