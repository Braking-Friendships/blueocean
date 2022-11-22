const express = require('express');
const app = express();
const httpServer = require('http').createServer(app);
const { controller } = require('./controllers/index.js');
const options = {
  cors: {
    origin: ['http://localhost:3000', "https://admin.socket.io"],
    credentials: true
  }
};
const { instrument } = require("@socket.io/admin-ui");
const io = require('socket.io')(httpServer, options);
const ShortUniqueId = require('short-unique-id');
const uid = new ShortUniqueId({ length: 6 });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const shufflePlayerOrder = (playersArray) => {
  let i = playersArray.length;
  while (i > 0) {
    let idxToSwitch = Math.floor(Math.random() * playersArray.length);
    i--;
    let temp = playersArray[i];
    playersArray[i] = playersArray[idxToSwitch];
    playersArray[idxToSwitch] = temp;

  }
  return playersArray;
}

io.on('connection', socket => {
  console.log(socket.id)

  const setInitialState = (gameState) => {
    // TODO: get socket ids from game lobby room, those become the users in game state
    // set socketid as hand1...
    gameState.playerOrder = shufflePlayerOrder([0, 1, 2, 3])
    // prevTurns should have socketid or username and play
    gameState.prevTurns = {};

    socket.ekGameState = gameState;

    emitState(socket.ekGameState)

    console.log('Setting game state: ', socket.ekGameState)
  }

  const updateState = (username, cardIdx) => {

  }

  const emitState = (gameState) => {
    // emit each player's hand, other players hand count and count of deck to respective socket
    // currently emitting to single socket; grab other sockets from current room
    socket.emit('game-state', gameState)
  }

  const playCard = (username, cardType, cardIdx) => {
    // we always know the active player by socket.id
    // so we just need to know who the affected player is for each play
    // For each case, what is the effect on:
    // deck
    // user hands
    // player order
    // For every case prevTurns needs to be updated
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
      default:
        // two cards needed for cat cards, handle verification on front end before emitting
        break;

    }
  }

  // SOCKET LISTENERS
  socket.on('send-message', message => {
    console.log(message)
  })

  // Socket listeners for chat components ------------
  socket.on('send-chat-message', (message, room) => {
    // if room text is empty send to everyone
    if (room === '') {
      // socket.broadcast sends message to everyone except me
      socket.broadcast.emit('receive-message', message);
      console.log(message);
    } else {
      // send message to room only
      socket.to(room).emit('receive-message', message);;
    }
  });
  // socket listener for room joins
  socket.on('join-room', (room, cb) => {
    socket.join(room);
    cb(`Joined ${room}`)
  })
  // ---------------------------------------------------


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

  // PROFILE CHANGES
  socket.on('get-friend-data', async user => {
    const userData = await controller.getFriendData(user)
    console.log(userData)
    socket.emit('send-friend-data', userData)
  })
  socket.on('post-edit-username', async user => {
    const createUser = await controller.updateUser(user)
    const userData = await controller.getUserData(user)
    console.log(userData)
    socket.emit('send-edit-username', userData)
  })
  socket.on('post-edit-avatar', async user => {
    const createUser = await controller.updateUser(user)
    const userData = await controller.getUserData(user)
    console.log(userData)
    socket.emit('send-edit-avatar', userData)
  })



  // ROOM LISTENERS
  socket.on('host-room', socketId => {
    const roomId = uid();
    socket.join(roomId);
    console.log('Rooms available', io.of('/').adapter.rooms)
  })
  socket.on('join-room', userObj => {
    console.log(userObj)
    socket.join(`${userObj.room}`)
    console.log('Sockets in room', io.of(`/${userObj.room}`).adapter.sids)
  })
  const rooms = io.of('/').adapter.rooms;
  const sids = io.of('/').adapter.sids;
  console.log(rooms)

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


instrument(io, { auth: false });


// UNCOMMENT AND RUN ONCE TO RECREATE DUMMY DATA
// const { users } = require('./dummyData');
// users.map(user => controller.createDummyData(user))


httpServer.listen(5001, () => console.log('Listening on 5001'));
