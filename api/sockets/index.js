const socketApp = (server) => {
  const
    jwt = require('jsonwebtoken'),
    socketioJwt = require('socketio-jwt'),
    secretJwt = require('../config/server').secret_jwt

  try {
    io = require('socket.io')(server)
    if (io != null) {
      console.log('Socket server: ON')

    //  io.on('connection', function (socket) {
    //     //socket.on('event');
    //     let jwt = socket.handshake.query.token;
    //     console.log('jwt in connection event', jwt);
    //   }).on('authenticated', function(socket) {
    //   //this socket is authenticated, we are good to handle more events from it.
    //   console.log('hello! ' + socket);
    // });
    io.on('connection', function(socket){

      //temp delete socket from namespace connected map
      delete io.sockets.connected[socket.id];

      var options = {
        secret: secretJwt,
        timeout: 5000 // 5 seconds to send the authentication message
      }

      var auth_timeout = setTimeout(function () {
        socket.disconnect('unauthorized');
      }, options.timeout || 5000);

      var authenticate = function (data) {
        clearTimeout(auth_timeout);
        if (data.token) {
          try {
          jwt.verify(data.token.substring(4), options.secret, options,function(err, decoded) {
              if (err){
                console.log('err', err)
                socket.disconnect('unauthorized');
              }
              if (!err && decoded){
                //restore temporarily disabled connection
                io.sockets.connected[socket.id] = socket;

                socket.decoded_token = decoded;

                socket.connectedAt = new Date();

                // Disconnect listener
                socket.on('disconnect', function () {
                  console.info('SOCKET [%s] DISCONNECTED', socket.id);
                });

                socket.u = decoded.user;
                console.log('[SOCKET.IO] %s - user decoded: %s', socket.id, decoded.user.email);
                socket.emit('authenticated');
              }
            })
        } catch (err) {
          console.error('err catch', err);
        }
        }
  
      }

      socket.on('authenticate', authenticate );
    });

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