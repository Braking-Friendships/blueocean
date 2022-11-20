const express = require('express');
const app = express();
const httpServer = require('http').createServer(app);
const { controller } = require('./controllers/index.js');
const options = {
  cors: ['http://localhost:3000']
};
const io = require('socket.io')(httpServer, options);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const shufflePlayerOrder = (playersArray) => {
  let i = playersArray.length;
  while(i > 0) {
    let idxToSwitch = Math.floor(Math.random() * playersArray.length);
    i--;
    let temp = playersArray[i];
    playersArray[i] = playersArray[idxToSwitch];
    playersArray[idxToSwitch] = temp;

  }
  return playersArray;
}

io.on('connection', socket => {
  console.log(socket.ekGameState)

  const setInitialState = (gameState) => {
    // TODO: get socket ids from game lobby room, those become the users in game state
    // set socketid as hand1...
    gameState.playerOrder = shufflePlayerOrder([0, 1, 2, 3])
    gameState.prevTurns = {};

    socket.ekGameState = gameState;

    emitState(socket.ekGameState)

    // emit each player's hand, other players hand count and count of deck to respective socket
    console.log('Setting game state: ', socket.ekGameState)
  }

  const updateState = (username, cardIdx) => {

  }

  const emitState = (gameState) => {
    socket.emit('game-state', gameState)
  }

  const playCard = (username, cardType, cardIdx) => {
    switch (cardType) {
      case 'attack':
        console.log(username, 'attack card played')
        break;
      case 'defuse':
        console.log(username, 'defuse card played')
        break;
      case 'favor':
        console.log(username, 'favor card played')
        break;
      case 'future':
        console.log(username, 'future card played')
        break;
      case 'nope':
        console.log(username, 'nope card played')
        break;
      case 'skip':
        console.log(username, 'skip card played')
        break;
      case 'shuffle':
        console.log(username, 'shuffle card played')
        break;
      // how do we want to handle steal cards: burritocat, rainbowcat, tacocat, watermeloncat, beardcat

    }
  }

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
    setInitialState(gameState)
  })
  socket.on('end-game', () => {
    delete socket.ekGameState
    console.log('Game over', socket.ekGameState)
  })
  socket.on('play-card', (username, cardType, cardIdx) => {
    playCard(username, cardType, cardIdx)
  })
  socket.on('draw-card', (username) => {
    console.log('drawing card:', username)
  })
  socket.on('player-loses', (username) => {
    console.log(username, 'lost')
  })
})



// UNCOMMENT AND RUN ONCE TO RECREATE DUMMY DATA
// const { users } = require('./dummyData');
// users.map(user => controller.createDummyData(user))


  httpServer.listen(5001, () => console.log('Listening on 5001'));
