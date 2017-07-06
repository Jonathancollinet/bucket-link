'use strict';

const
  { User, Bucket, Link } = require('../../../models'),
  resAttributes = require('../../../config/resAtributes.json')

module.exports = (chai, should, server) => {
  let token = ''

  describe('Test Authentification', () => {
    it('Get /auth/ping\t=> Status: 401, User not Connected', (done) => {
      chai.request(server)
        .get('/v1/auth/ping')
        .end((err, res) => {
          res.should.have.status(401)
          done()
        })
    })
    it('Post /auth\t=> Authorization Header with token', (done) => {
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
    it('Get /auth/ping\t=> Status: 200, User is connected', (done) => {
      chai.request(server)
        .get('/v1/auth/ping')
        .set('authorization', token)
        .end((err, res) => {
          res.should.have.status(200)
          done()
        })
    })
    it('Delete\t/auth => Status: 200, User disconnected', (done) => {
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
