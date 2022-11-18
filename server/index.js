const express = require('express');
const app = express();
const httpServer = require('http').createServer(app);
const options = {
  cors: ['http://localhost:3000']
};
const io = require('socket.io')(httpServer, options);
const router = require('./routes.js')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

io.on('connection', socket => {
  console.log(socket.id)
  socket.emit('receive-message', 'hello this is from the server')
  socket.on('send-message', message => {
    console.log(message)
  })
})

httpServer.listen(5001, () => console.log('Listening on 5001'));
