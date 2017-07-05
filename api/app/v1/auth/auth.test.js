'use strict';

const
  { User, Bucket, Link } = require('../../../models'),
  resAttributes = require('../../../config/resAtributes.json')

module.exports = (chai, should, server) => {
  let token = ''

  describe('Get /auth/ping', () => {
    it('Return status 400 unauthorized', (done) => {
      chai.request(server)
        .get('/v1/auth/ping')
        .end((err, res) => {
          res.should.have.status(401)
          done()
        })
    })
  })

  describe('Post /auth', () => {
    it('Try to login', (done) => {
      User.findOne().then(user => {
        chai.request(server)
          .post('/v1/auth')
          .send({
            'email': user.email,
            'password': 'password'
          })
          .end((err, res) => {
            res.header.should.have.own.property('authorization')
            token = res.header.authorization
            done()
          })
      })
    })
  })

  describe('Get /auth/ping', () => {
    it('Return 200 OK', (done) => {
      chai.request(server)
        .get('/v1/auth/ping')
        .set('authorization', token)
        .end((err, res) => {
          res.should.have.status(200)
          done()
        })
    })
  })

  describe('Delete /auth', () => {
    it('Return 200 OK', (done) => {
      chai.request(server)
        .delete('/v1/auth')
        .set('authorization', token)
        .end((err, res) => {
          res.should.have.status(200)
          done()
        })
    })
  })
}
