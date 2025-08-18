const { Server } = require('socket.io');

let io = null;

function init(server) {
  io = new Server(server, {
    cors: {
      origin: 'http://localhost:5173',
      credentials: true
    }
  });

  io.on('connection', () => {
    console.log('Cliente conectado a Socket.io');
  });
}

function getIO() {
  if (!io) {
    throw new Error('Socket.io no inicializado');
  }
  return io;
}

module.exports = { init, getIO };
