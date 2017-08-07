/*
    @author Antoine Chiny
    @github.com/TonyChG
    @email antoine.chiny@ynov.com
    @File: board.js

    @fileOverview Boards (CRUD)
    GET     /               => All Boards
    GET     /boardId       => Board by id + 25 first buckets
    GET     /boardId/buckets => Get buckets of board by id
    POST    /               => Create new board (return newly create board)
    POST    /boardId/buckets => Add new bucket to board (return newly create bucket)
    DELETE  /boardId       => Delete board by id
    PATCH   /boardId       => Update board by id
*/
'use strict';

const
  boardCtrl = require('./board'),
  { isAuth } = require('../middlewares')

module.exports = (express) => {
  const router = express.Router()

  router.use(isAuth)

  router.get('/', boardCtrl.index)
  router.get('/:boardId', boardCtrl.show)
  router.get('/:boardId/links', boardCtrl.getBucketsByBoardId)
  router.post('/', boardCtrl.create)
  // router.post('/:boardId/links', boardCtrl.createBucket)
  // router.delete('/:boardId', boardCtrl.destroy)
  // router.patch('/:boardId', boardCtrl.update)

  return router
}