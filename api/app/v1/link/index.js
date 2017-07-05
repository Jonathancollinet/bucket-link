/*
    @author Antoine Chiny
    @github.com/TonyChG
    @email antoine.chiny@ynov.com
    @File: link.js

    @fileOverview Link (CRUD)
    GET     /         => All Links
    GET     /linkId   => Bucket by id
    POST    /         => Create new link without bucket (return newly create link)
    DELETE  /linkId   => Delete bucket by id
    PATCH   /linkId   => Update bucket by id
*/

const
  linkCtrl = require('./link'),
  { isAuth } = require('../middlewares')

module.exports = (express) => {
  const router = express.Router()

  router.use(isAuth)

  router.get('/', linkCtrl.index)
  router.get('/:linkId', linkCtrl.show)
  router.post('/', linkCtrl.create)
  router.delete('/:linkId', linkCtrl.destroy)
  router.patch('/:linkId', linkCtrl.update)

  return router
}