const express = require('express');
const app = express();
const httpServer = require('http').createServer(app);
const {controller} = require('./controllers/index.js');
const options = {
  cors: ['http://localhost:3000']
};
const io = require('socket.io')(httpServer, options);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

io.on('connection', socket => {
  console.log(socket.id)

  // SOCKET EMITTERS
  socket.emit('receive-message', 'hello this is from the server')

  const setState = (gameState) => {
    socket.ekGameState = gameState
    console.log('Setting game state: ', socket.ekGameState)
  }

  const updateState = (currentState, ) => {
    // take in currentstate and change
  }
  socket.emit('')


  // SOCKET LISTENERS
  socket.on('send-message', message => {
    console.log(message)
  })

  // AUTH/USER DATA LISTENERS
  socket.on('get-user-data', async user => {
    const userData = await controller.getUserData(user)
    console.log(userData)
    socket.emit('send-user-data', userData)
  })
  socket.on('create-user', async user => {
    console.log('~~ DATA FROM LOGIN ~~ ', user);
    const createUser = await controller.createUser(user)
    const userData = await controller.getUserData(user)
    console.log(userData)
    socket.emit('send-user-data', userData)
  })

  // GAME STATE LISTENERS
  socket.on('start-game', async gameState => {
    setState(gameState)
    socket.emit('current-state', socket.ekGameState)
  })
  socket.on('end-game', () => {
    console.log('before', socket.ekGameState)
    delete socket.ekGameState
    console.log('after', socket.ekGameState)
  })
  socket.on('play-card', (user, card) => {
    console.log('User', user, 'Card', socket.ekGameState[user][card])
  })
})

httpServer.listen(5001, () => console.log('Listening on 5001'));
