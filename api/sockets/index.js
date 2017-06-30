const socketApp = (server) => {
  const
    jwt = require('jsonwebtoken')

  try {
    io = require('socket.io')(server)
    if (io != null) {
      console.log('Socket server: ON')
    } else {
      throw new Error('Returned null after attaching to koa server.')
    }
  } catch (error) {
    console.error('Failed to init socket.io!', error)
  }
  return
}

module.exports = {
  socketApp
}