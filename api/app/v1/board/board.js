/*
    @author Antoine Chiny
    @github.com/TonyChG
    @email antoine.chiny@ynov.com
    @File: controller.js

    @fileOverview Boards controller
    */
'use strict';

const
  { getUserFromToken } = require('../auth/auth'),
  { UserBoard, User, Board, Bucket } = require('../../../models'),
  { isSet, setResponse, isValidColor } = require('../../../commons'),
  http = require('http')

module.exports = {

  async index(req, res) {
    const user = getUserFromToken(req.get('authorization'))

    if (!user) {
      setResponse(res, 'UNAUTHORIZED')
    } else {
      const connectedUser = await User.findById(user.id)
      if (!connectedUser) {
        setResponse(res, 'NOT_FOUND')
      } else {
        const boards = await Board.findAll({
          attributes: ['id', 'name','createdAt', 'updatedAt'],
          where: {
            userId: connectedUser.get('id')
          },
          include: [{
            model: Bucket,
            limit: 25,
            order: [
              ['createdAt', 'DESC']
            ],
            attributes: { exclude: ['UserId'] }
          }]
        })
        const userBoards = await connectedUser.getBoards()
        setResponse(res, 'OK', boards)
      }
    }
  },

  async show(req, res) {
    if (!parseInt(req.params.boardId)) {
      setResponse(res, 'NOT_FOUND')
    } else {
      const board = await Board.findOne({
        attributes: ['id', 'name', 'userId', 'createdAt', 'updatedAt'],
        where: { id: req.params.boardId },
        include: [{
          model: User, as: 'Owner'
        },{
          model: User, through: UserBoard, as: 'Contributors'
        }, {
          model: Bucket
        }]
      }).catch((err) => { console.error(err); })
      if (!board) {
        setResponse(res, 'NOT_FOUND')
      } else {
        setResponse(res, 'OK', board)
      }
    }
  },

  async getBucketsByBoardId(req, res) {
    if (!parseInt(req.params.boardId)) {
      setResponse(res, 'NOT_FOUND')
    } else {
      const board = await Board.findById(req.params.boardId)
      const buckets = await board.getBuckets()
      if (!buckets) {
        setResponse(res, 'NOT_FOUND')
      } else {
        setResponse(res, 'OK', buckets)
      }
    }
  },

  async create(req, res) {
    if (!isSet(req.body.name)) {
      setResponse(res, 'NO_CONTENT')
    } else {
      const user = getUserFromToken(req.get('authorization')),
            userModel = await User.findById(user.id)

      try {
        const board = await userModel.createBoard({
          name: req.body.name,
          UserId: user.id
        })
        setResponse(res, 'OK', board)
      } catch (err) {
        setResponse(res, 'NOT_FOUND')
      }
    }
  },

  async createBucket(req, res) {
    if (!parseInt(req.params.boardId)) {
      setResponse(res, 'NOT_FOUND')
    } else {
      const board = await Board.findById(req.params.boardId)

      if (!board) {
        setResponse(res, 'NOT_FOUND')
      } else {
        if (!isSet(req.body.name) && !isSet(req.body.color)) {
          setResponse(res, 'NO_CONTENT')
        } else {
          const user = getUserFromToken(req.get('authorization'))
            
          try {
            const newBucket = await Bucket.create({
              name: req.body.name,
              color: req.body.color,
              UserId: user.id,
              BoardId: req.params.boardId,
              t: 42
            })
            setResponse(res, 'OK', newBucket)
          } catch (err) {
            setResponse(res, 'SERVER_ERROR')
          }
        }
      }
    }
  },

  async destroy(req, res) {
    if (!parseInt(req.params.boardId)) {
      setResponse(res, 'NOT_FOUND')
    } else {
      Board.findById(req.params.boardId).then(board => {
        if (!board) {
          setResponse(res, 'NOT_FOUND')
        } else {
          return board.destroy()
        }
      }).then(() => {
        setResponse(res, 'OK')
      })
    }
  },

  async update(req, res) {
    const user = getUserFromToken(req.get('authorization'))

    if (!parseInt(req.params.boardId)) {
      setResponse(res, 'NOT_FOUND')
    } else {
      const board = await Board.findById(req.params.boardId)
      if (!board) {
        setResponse(res, 'NOT_FOUND')
      } else {
        if (isSet(req.body.name)) {
          board.update({
            'name': req.body.name
          })
          setResponse(res, 'OK', board)
        } else {
          setResponse(res, 'NO_CONTENT')
        }
      }
    }
  }


}
