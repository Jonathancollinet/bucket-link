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
  { User, Bucket, Link } = require('../../../models'),
  { isSet, setResponse } = require('../../../commons')

module.exports = {
  
  // # getGlobalMetrics
  async getGlobalMetrics(req, res) {
   
  },


  async getUsers(req, res) {
    const users = await User.findAll({
      limit: 150,
      order: [
        ['createdAt', 'DESC']
      ]
    })
    setResponse(res, 'OK', users)
  },

  async getUserByID(req, res) {
  
  },

  async getBuckets(req, res) {
    const buckets = await Bucket.findAll({
      limit: 150,
      order: [
        ['createdAt', 'DESC']
      ]
    })
    setResponse(res, 'OK', buckets)
  },

  async getBucketByID(req, res) {
  
  },

  async getLinks(req, res) {
    const links = await Link.findAll({
      limit: 150,
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