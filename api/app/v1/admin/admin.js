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
  
  },

  async createBucket(req, res) {
  
  },

  async createLink(req, res) {
  
  },

  // #### END POST // BEGIN PATCH ####

  async updateUserByID(req, res) {
  
  },

  async updateBucketByID(req, res) {
  
  },

  async updateLinkByID(req, res) {
  
  },

  // #### END PATCH // BEGIN DELETE ####

  async deleteUserByID(req, res) {
  
  },

  async deleteBucketByID(req, res) {
  
  },

  async deleteLinkByID(req, res) {
  
  }

  // #### END ####

} // end module.exports