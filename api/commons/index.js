'use strict';

const 
  resAttributes = require('../config/resAtributes.json'),
  { bucketColors } = require('../config/config.json')

module.exports = {
  randint(min, max) {
    return Math.floor((min+Math.random()) * max)
  },

  isSet(value) {
    return typeof(value) !== 'undefined'
  },

  /**
   * Set and send the response to client
   * 
   * @param {any} res Nodejs response object
   * @param {any} type Type of response => config/resAttributes.json
   * @param {any} payload Payload (data, ex : buckets array [])
   */
  setResponse(res, type = 'OK', payload = {}) {
    res.statusCode = resAttributes[type].status
    res.statusMessage = resAttributes[type].message

    if (resAttributes[type].status !== 200) {
      res.json({ err: true, payload })
    } else {
      res.json(payload)
    }
  },

  isValidColor(color) {
    for (let i = 0, len = bucketColors.length; i < len; i++) {
      const availableColor = bucketColors[i]
      if (availableColor === color) {
        return true
      }
    }
    return false
  }
}