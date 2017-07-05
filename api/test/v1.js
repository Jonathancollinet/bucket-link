'use strict';

const
  chai = require('chai'),
  chaiHttp = require('chai-http'),
  server = require('../app/v1'),
  should = chai.should()

process.env.NODE_ENV = 'test'

chai.use(chaiHttp)

require('../app/v1/auth/auth.test')(chai, should, server)
require('../app/v1/bucket/bucket.test')(chai, should, server)
require('../app/v1/link/link.test')(chai, should, server)
require('../app/v1/user/user.test')(chai, should, server)
