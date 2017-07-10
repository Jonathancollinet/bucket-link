/*
    @author Antoine Chiny
    @github.com/TonyChG
    @email antoine.chiny@ynov.com
    @File: index.js

    @fileOverview Link Scrapper
*/

const MetaInterceptor = require('node-metainspector')

module.exports = (url) => {
  return new Promise((resolve, reject) => {
    const client = new MetaInterceptor(url, { timeout: 5000 })
    client.on('fetch', () => {
      resolve(client)
    })
    client.on('error', err => reject(err))
    client.fetch()
  })
}