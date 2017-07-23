/*
    @author Antoine Chiny
    @github.com/TonyChG
    @email antoine.chiny@ynov.com
    @File: user.js

    @fileOverview 
*/

const
  { getUserFromToken } = require('../auth/auth'),
  { User, Bucket, Link } = require('../../../models'),
  { isSet, setResponse } = require('../../../commons')

module.exports = {
  async index(req, res) {
    setResponse(res)
  },

  async show(req, res) {
    setResponse(res)
  },

  async create(req, res) {
    setResponse(res)
  },

  async destroy(req, res) {
    setResponse(res)
  },

  async update(req, res) {
    setResponse(res)
  }
}
