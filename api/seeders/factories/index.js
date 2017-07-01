const
  { randint } = require('../../commons'),
  bcrypt = require('bcrypt-nodejs'),
  faker = require('faker')

module.exports = {
  genRandomObjTable: (model, length, includes = null) => {
    const randomTab = []
    for (let i = 0, len = length; i < len; i++) {
      randomTab.push(model(includes))
    }
    return randomTab
  },

  randomLink: ({ buckets, users }) => {
    const 
      randomBucketId = buckets[randint(0, buckets.length)].id,
      randomUserId = users[randint(0, users.length)].id

    return {
      user_id: randomUserId,
      bucket_id: randomBucketId,
      title: faker.lorem.sentence(),
      url: faker.internet.url(),
      description: faker.lorem.paragraph(),
      updatedAt: faker.date.recent(),
      createdAt: faker.date.recent()
    }
  },

  randomBucket: ({ users }) => {
    const 
      randomId = users[randint(0, users.length)].id

    return {
      user_id: randomId,
      name: faker.lorem.word(),
      color: faker.internet.color(),
      updatedAt: faker.date.recent(),
      createdAt: faker.date.recent()
    }
  },

  randomUser: () => {
    return {
      email: faker.internet.email(),
      password: bcrypt.hashSync('password'),
      updatedAt: faker.date.recent(),
      createdAt: faker.date.recent()
    }
  }
}