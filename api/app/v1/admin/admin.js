/*
    @author Antoine Chiny
    @github.com/TonyChG
    @email antoine.chiny@ynov.com
    @File: controller.js

    @fileOverview Links Controller
*/
'use strict';

const
  { getUserFromToken } = require('../auth/auth'),
  { User, Bucket, Link, sequelize } = require('../../../models'),
  { isSet, setResponse } = require('../../../commons')

module.exports = {
  
  // # getGlobalMetrics
  async getGlobalMetrics(req, res) {
   
  },


  async getUsers(req, res) {
    const users = await User.findAll({
      order: [
        ['createdAt', 'DESC']
      ]
    })
    setResponse(res, 'OK', users)
  },

  async getUserByID(req, res) {
    const users = await User.findOne({
      where: { id: req.params.id }
    })
    setResponse(res, 'OK', users)
  },

  async getBuckets(req, res) {
    const buckets = await Bucket.findAll({
      attributes: ['id', 'name', 'createdAt', 'updatedAt'],
      order: [['createdAt', 'DESC']],
      include: [{
        model: Link,
        attributes: ['id', 'bucketId', 'userId']
      }, {
          model: User,
          attributes: ['id', 'email',],
      }]
    })
    setResponse(res, 'OK', buckets)
  },

  async getBucketByID(req, res) {
    const buckets = await Bucket.findOne({
      attributes: ['id', 'name', 'createdAt', 'updatedAt'],
      where: { id: req.params.id },
      order: [['createdAt', 'DESC']],
      include: [{
        model: Link,
        attributes: ['id', 'bucketId', 'userId', 'title', 'description', 'url'],
      }, {
          model: User,
          attributes: ['id', 'email',],
      }]
    })
    setResponse(res, 'OK', buckets)
  },

  async getLinks(req, res) {
    const links = await Link.findAll({
      order: [
        ['createdAt', 'DESC']
      ]
    })
    setResponse(res, 'OK', links)
  },

  // #### END GET // BEGIN POST ####

  async createUser(req, res) {
    const user = await User.create({
      email: req.body.email,
      password: req.body.password
    })
    setResponse(res, 'OK', user)
  },

  async createBucket(req, res) {
    const bucket = await Bucket.create({
      name: req.body.name,
      color: req.body.color,
      userId: req.body.userId
    })
    setResponse(res, 'OK', bucket)
  },

  async createLink(req, res) {
    const link = await Link.create({
      title: req.body.title,
      description: req.body.description,
      url: req.body.url,
      color: req.body.color,
      userId: req.body.userId,
      bucketId: req.body.bucketId
    })
    setResponse(res, 'OK', link)
  },

  // #### END POST // BEGIN PATCH ####

  async updateUserByID(req, res) {
    const user = await User.fineOne({
      where: { id: req.params.id }
    })
    if (!user) {
      setResponse(res, 'NOT_FOUND')
    } else {
      user = await user.update({
        email: req.body.email,
        password: req.body.password
      })
      setResponse(res, 'OK', user)
    }
  },

  async updateBucketByID(req, res) {
    const bucket = await Bucket.fineOne({
      where: { id: req.params.id }
    })
    if (!bucket) {
      setResponse(res, 'NOT_FOUND')
    } else {
      bucket = await bucket.update({
        name: req.body.name,
        color: req.body.color,
        userId: req.body.userId
      })
      setResponse(res, 'OK', bucket)
    }
  },

  async updateLinkByID(req, res) {
    const link = await Link.fineOne({
      where: { id: req.params.id }
    })
    if (!link) {
      setResponse(res, 'NOT_FOUND')
    } else {
      link = await link.update({
        title: req.body.title,
        description: req.body.description,
        url: req.body.url,
        color: req.body.color,
        userId: req.body.userId,
        bucketId: req.body.bucketId
      })
      setResponse(res, 'OK', link)
    }
  },

  // #### END PATCH // BEGIN DELETE ####

  async deleteUserByID(req, res) {
    const user = await User.destroy({
      where: { id: req.params.id }
    })
    setResponse(res, 'OK', user)
  },

  async deleteBucketByID(req, res) {
    const bucket = await Bucket.destroy({
      where: { id: req.params.id }
    })
    setResponse(res, 'OK', bucket)
  },

  async deleteLinkByID(req, res) {
    const link = await Link.destroy({
      where: { id: req.params.id }
    })
    setResponse(res, 'OK', link)
  }

  // #### END ####

} // end module.exports