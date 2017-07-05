'use strict';

const
  { User, Bucket, Link } = require('../../../models'),
  resAttributes = require('../../../config/resAtributes.json')

module.exports = (chai, should, server) => {
  let token = '',
    createdBucket = ''

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

  describe('Get /buckets', () => {
    it('Return array of buckets', (done) => {
      chai.request(server)
        .get('/v1/buckets')
        .set('authorization', token)
        .end((err, res) => {
          res.body.should.be.a('array')
          res.should.have.status(200)
          done()
        })
    })
  })

  describe('Get /buckets/:id', () => {
    it('Return bucket by id', (done) => {
      chai.request(server)
        .get('/v1/buckets/1')
        .set('authorization', token)
        .end((err, res) => {
          res.body.should.be.a('object')
          res.should.have.status(200)
          res.body.should.have.all.keys('id', 'name', 'color', 'UserId', 'createdAt', 'updatedAt')
          done()
        })
    })
  })

  describe('Post /buckets', () => {
    it('Return a newly created bucket', (done) => {
      chai.request(server)
        .post('/v1/buckets')
        .send({
          'name': 'Un super bucket!',
          'color': '#323232'
        })
        .set('authorization', token)
        .end((err, res) => {
          createdBucket = res.body.id
          res.body.should.be.a('object')
          done()
        })
    })
  })

  describe('Post /buckets/:id/links', () => {
    it('Return newly crated link', (done) => {
      chai.request(server)
        .post('/v1/buckets/1/links')
        .send({
          url: 'http://google.com',
          title: 'google.com!',
          description: "C'est vraiment génial google!"
        })
        .set('authorization', token)
        .end((err, res) => {
          res.body.should.be.a('object')
          res.should.have.status(200)
          done()
        })
    })
  })

  describe('Get /buckets/:id/links', () => {
    it('Return array of links', (done) => {
      chai.request(server)
        .get('/v1/buckets/1/links')
        .set('authorization', token)
        .end((err, res) => {
          res.body.should.be.a('array')
          res.should.have.status(200)
          done()
        })
    })
  })

  describe('Patch /buckets/:id', () => {
    it('Return updated bucket', (done) => {
      chai.request(server)
        .patch(`/v1/buckets/${createdBucket}`)
        .send({
          'name': 'Hey Salut toto!',
          'color': '#821379'
        })
        .set('authorization', token)
        .end((err, res) => {
          res.body.should.be.a('object')
          res.body.should.have.all.keys('id', 'name', 'color', 'UserId', 'createdAt', 'updatedAt')
          res.should.have.status(200)
          done()
        })
    })
  })

  describe('Delete /buckets/:id', () => {
    it('200 on success delete', (done) => {
      chai.request(server)
        .delete(`/v1/buckets/${createdBucket}`)
        .set('authorization', token)
        .end((err, res) => {
          res.should.have.status(200)
          done()
        })
    })
  })

  describe('Logout from api', () => {
    it('Return a object with attribute disconnected: true', (done) => {
      chai.request(server)
        .delete('/v1/auth')
        .set('authorization', token)
        .end((err, res) => {
          res.body.should.be.a('object')
          res.body.should.have.all.keys('disconnected')
          done()
        })
    })
  })
}