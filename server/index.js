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
    // set deck game state
    // set each player hand
    // emit each player's hand, other players hand count and count of deck to respective socket
    console.log('Setting game state: ', socket.ekGameState)
  }

  const updateState = (currentState, type) => {
    // take in currentstate and change
    // switch case to check against type and update gamestate
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
    delete socket.ekGameState
    console.log('Game over', socket.ekGameState)
  })
  socket.on('play-card', (username, card, cardIdx) => {
    console.log('User', username, 'Card', card, 'Card index', cardIdx)
  })
  socket.on('draw-card', (username) => {
    console.log('drawing card:', username)
  })
  socket.on('player-loses', (username) => {
    console.log(username, 'lost')
  })
})

httpServer.listen(5001, () => console.log('Listening on 5001'));
