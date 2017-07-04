const
  { User, Bucket, Link } = require('../models'),
  chai = require('chai'),
  chaiHttp = require('chai-http'),
  server = require('../app/v1'),
  should = chai.should(),
  expect = chai.expect()

let token = ''

chai.use(chaiHttp)

describe('Get /auth/ping', () => {
  it('Return status 400 unauthorized', (done) => {
    chai.request(server)
      .get('/v1/auth/ping')
      .end((err, res) => {
        res.should.have.status(400)
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
        res.body.should.be.a('object')
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
        console.log(res.body)
        res.body.should.be.a('array')
        res.should.have.status(200)
        done()
      })
  })
})
