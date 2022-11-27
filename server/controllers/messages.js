const { Socket } = require('socket.io');

module.exports.messageController = {
  sendMessage: (message, room) => {
    if (room === '') {
      socket.broadcast.emit('receive-message', message);
    } else {
      socket.to(room).emit('receive-message', message);
    }
  }
}