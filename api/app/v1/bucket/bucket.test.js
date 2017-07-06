'use strict';

const
  { User, Bucket, Link } = require('../../../models'),
  { randint } = require('../../../commons'),
  resAttributes = require('../../../config/resAtributes.json')

module.exports = async (chai, should, server) => {
  let token, createdBucket, createdLinkId, randBucketId, randUserId

  const buckets = await Bucket.findAll({ attributes: ['id'] })
  const users = await User.findAll({ attributes: ['id'] })

  randBucketId = buckets[randint(0, buckets.length-1)].id
  randUserId = users[randint(0, users.length-1)].id

  describe('Test Buckets CRUD', () => {
    it('Post /auth\t=> Return : Authorization Header(Token)', (done) => {
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
    it('Get /buckets\t=> Array of objects bucket.', (done) => {
      chai.request(server)
        .get('/v1/buckets')
        .set('authorization', token)
        .end((err, res) => {
          res.body.should.be.a('array')
          res.should.have.status(200)
          done()
        })
    })
    it(`Get /buckets/${randBucketId}\t=> Object Bucket`, (done) => {
      chai.request(server)
        .get(`/v1/buckets/${randBucketId}`)
        .set('authorization', token)
        .end((err, res) => {
          res.body.should.be.a('object')
          res.should.have.status(200)
          res.body.should.have.all.keys(
            'id',
            'name',
            'color',
            'UserId',
            'createdAt',
            'updatedAt'
          )
          res.body.id.should.equal(randBucketId)
          done()
        })
    })
    it('Post /buckets\t=> Status 200, Payload = { Newly created bucket }.', (done) => {
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
    it(`Post /buckets/${randBucketId}/links\t=> Status: 200, Payload = { Newly created link }.`, (done) => {
      chai.request(server)
        .post(`/v1/buckets/${randBucketId}/links`)
        .send({
          url: 'http://google.com',
          title: 'google.com!',
          description: "C'est vraiment génial google!"
        })
        .set('authorization', token)
        .end((err, res) => {
          res.body.should.be.a('object')
          createdLinkId = res.body.id
          res.should.have.status(200)
          done()
        })
    })
    it(`Get /buckets/${randBucketId}/links\t=> Status: 200, Payload = { Array of bucket's links }`, (done) => {
      chai.request(server)
        .get(`/v1/buckets/${randBucketId}/links`)
        .set('authorization', token)
        .end((err, res) => {
          res.body.should.be.a('array')
          res.should.have.status(200)
          done()
        })
    })
    it(`Patch /buckets/${randBucketId}\t=> Status 200, Payload = { Updated bucket }`, (done) => {
      chai.request(server)
        .patch(`/v1/buckets/${randBucketId}`)
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
    it(`Delete /buckets/${randBucketId}\t=> Status: 200`, (done) => {
      chai.request(server)
        .delete(`/v1/buckets/${createdBucket}`)
        .set('authorization', token)
        .end((err, res) => {
          res.should.have.status(200)
          done()
        })
    })
    it(`Delete /links/{Last created bucket}\t=> Status: 200`, (done) => {
      chai.request(server)
        .delete(`/v1/links/${createdLinkId}`)
        .set('authorization', token)
        .end((err, res) => {
          res.should.have.status(200)
          done()
        })
    })
    it('Delete /auth\t=> Status 200, Payload = { disconnected: true }', (done) => {
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