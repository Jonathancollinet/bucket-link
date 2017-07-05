const
  { randint } = require('../../commons'),
  bcrypt = require('bcrypt-nodejs'),
  faker = require('faker')

module.exports = {
  genRandomObjTable: (model, length, includes = null) => {
    const randomTab = []
    if (!length) {
      return randomTab
    }
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
      userId: randomUserId,
      bucketId: randomBucketId,
      title: faker.lorem.sentence(),
      url: faker.internet.url(),
      description: faker.lorem.paragraph(),
      updatedAt: faker.date.past(2),
      createdAt: faker.date.past(2)
    }
  },

  randomBucket: ({ users }) => {
    const 
      randomId = users[randint(0, users.length)].id

    return {
      userId: randomId,
      name: faker.lorem.word(),
      color: faker.internet.color(),
      updatedAt: faker.date.past(2),
      createdAt: faker.date.past(2)
    }
  },

  randomUser: () => {
    return {
      email: faker.internet.email(),
      password: bcrypt.hashSync('password'),
      updatedAt: faker.date.past(2),
      createdAt: faker.date.past(2)
    }
  }
}