
module.exports = {
  randint(min, max) {
    return Math.floor((min+Math.random()) * max)
  },

  isSet(value) {
    return typeof(value) !== 'undefined'
  }
}