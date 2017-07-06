'use strict';

const
  { User, Bucket, Link } = require('../../../models'),
  { randint } = require('../../../commons'),
  resAttributes = require('../../../config/resAtributes.json')

module.exports = async (chai, should, server) => {
  let token, createdLinkId, randLinkId

  const links = await Link.findAll({ attributes: ['id'] })

  randLinkId = links[randint(0, links.length-1)].id

  describe('Test Links CRUD', () => {
    it('Post\t/auth => Return : Authorization Header(Token)', (done) => {
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
    it('Get\t/links => Array of most 50 most recent links (DESC)', (done) => {
      chai.request(server)
        .get('/v1/links')
        .set('authorization', token)
        .end((err, res) => {
          res.body.should.be.a('array')
          res.should.have.status(200)
          done()
        })
    })
    it(`Get\t/links/${randLinkId} => Object Link`, (done) => {
      chai.request(server)
        .get(`/v1/links/${randLinkId}`)
        .set('authorization', token)
        .end((err, res) => {
          res.body.should.be.a('object')
          res.should.have.status(200)
          res.body.should.have.all.keys(
            'id',
            'title',
            'url',
            'UserId',
            'description',
            'createdAt',
            'updatedAt'
          )
          done()
        })
    })
    it('Post\t/links => Anonymous link BucketId = 0', (done) => {
      chai.request(server)
        .post('/v1/links')
        .send({
          'title': 'toto un site de vente de blague!',
          'url': 'http://toto.com'
        })
        .set('authorization', token)
        .end((err, res) => {
          createdLinkId = res.body.id
          res.body.should.be.a('object')
          done()
        })
    })
    it(`Patch\t/links/${randLinkId} => Status 200, Payload = { Updated link }`, (done) => {
      chai.request(server)
        .patch(`/v1/links/${randLinkId}`)
        .send({
          'title': 'Hey Salut toto!',
          'url': 'http://tata.com'
        })
        .set('authorization', token)
        .end((err, res) => {
          res.body.should.be.a('object')
          res.body.should.have.all.keys(
            'id',
            'title',
            'url',
            'description',
            'UserId',
            'BucketId',
            'createdAt',
            'updatedAt'
          )
          res.should.have.status(200)
          done()
        })
    })
    it(`Delete\t/links/{Last created bucket} => Status: 200`, (done) => {
      chai.request(server)
        .delete(`/v1/links/${createdLinkId}`)
        .set('authorization', token)
        .end((err, res) => {
          res.should.have.status(200)
          done()
        })
    })
    it('Delete\t/auth => Status 200, Payload = { disconnected: true }', (done) => {
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
