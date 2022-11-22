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

<<<<<<< HEAD
const shuffle = (targetArray) => {
  let i = targetArray.length;
  while(i > 0) {
    let idxToSwitch = Math.floor(Math.random() * targetArray.length);
=======
const shufflePlayerOrder = (playersArray) => {
  let i = playersArray.length;
  while (i > 0) {
    let idxToSwitch = Math.floor(Math.random() * playersArray.length);
>>>>>>> main
    i--;
    let temp = targetArray[i];
    targetArray[i] = targetArray[idxToSwitch];
    targetArray[idxToSwitch] = temp;

  }
  return targetArray;
}

io.on('connection', socket => {
  // console.log(socket.id)

  const setInitialState = (gameState) => {
    // TODO: get socket ids from game lobby room, those become the users in game state
    // set socketid as hand1...
    gameState.playerOrder = shuffle([0, 1, 2, 3])
    // prevTurns should have socketid or username and play
    gameState.prevTurns = [];

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

  const playCard = (userCardType, userCardIdxs, affectedUser, affectedUserIdx, insertIdx) => {
    const gameState = socket.ekGameState;
    const deck = socket.ekGameState.deck;
    const playerHand = socket.ekGameState['hand1']

    // Update prevTurns
    socket.ekGameState.prevTurns.push({
      userCardType: userCardType ?? '',
      userCardIdxs: userCardIdxs ?? [],
      affectedUser: affectedUser ?? '',
      affectedUserIdx: affectedUserIdx ?? '',
      insertIdx: insertIdx ?? ''
    })

    // Remove played cards from user's hand
    if (userCardIdxs.length === 2) {
      socket.ekGameState['hand1'].splice(userCardIdxs[1], 1)
      socket.ekGameState['hand1'].splice(userCardIdxs[0], 1)
    } else {
      socket.ekGameState['hand1'].splice(userCardIdxs[0], 1)
    }

    // player order as array
    // current player is unshift playerorder
    // attack is just an insert of 10

    switch (userCardType) {
      case 'attack':
        // no effect on deck
        // player order remains same with repeat plays on attacked player
        console.log(socket.id, 'attack card played')
        break;
      case 'defuse':
        // insert bomb card at insertidx
        const bomb = deck.splice(0, 1)
        const copy = deck.slice(0, insertIdx).concat(bomb[0]).concat(deck.slice(insertIdx))
        socket.ekGameState.deck = copy;
        break;
      case 'favor':
        // remove card from affectedPlayer and give it to current player
        const giveCard = socket.ekGameState['hand2'].splice(0, 1)
        socket.ekGameState['hand1'].push(giveCard[0])
        break;
      case 'future':
        // show player next three cards
        socket.emit('show-future', deck.slice(0, 3))
        break;
      case 'nope':
        // no effect on deck
        // no effect on player order
        console.log(socket.id, 'nope card played')
        break;
      case 'skip':

        // no effect on deck
        // no effect on player order
        console.log(socket.id, 'skip card played')
        break;
      case 'shuffle':
        shuffle(socket.ekGameState.deck)
        break;
      default:
        const stealCard = socket.ekGameState[affectedUser].splice(affectedUserIdx, 1);

        socket.ekGameState['hand1'].push(stealCard[0]);
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
    // console.log('Rooms available', io.of('/').adapter.rooms)
  })
<<<<<<< HEAD
  socket.on('join-room', roomId => {
    socket.join(roomId)
    // console.log('Sockets in room', io.of(`/${roomId}`).adapter.sids)
  })
=======
  socket.on('join-room', userObj => {
    console.log(userObj)
    socket.join(`${userObj.room}`)
    console.log('Sockets in room', io.of(`/${userObj.room}`).adapter.sids)
  })
  const rooms = io.of('/').adapter.rooms;
  const sids = io.of('/').adapter.sids;
  console.log(rooms)
>>>>>>> main

  // GAME STATE LISTENERS
  socket.on('start-game', async gameState => {
    setInitialState(gameState)
  })
  socket.on('end-game', () => {
    delete socket.ekGameState
    console.log('Game over', socket.ekGameState)
  })
  socket.on('play-card', (userCardType, userCardIdxs, affectedUser, affectedUserIdx, insertIdx) => {
    console.log('in play-card', insertIdx)
    playCard(userCardType, userCardIdxs, affectedUser, affectedUserIdx, insertIdx)
  })
  socket.on('draw-card', (username) => {
    socket.ekGameState['hand1'].push(socket.ekGameState.deck[0])
    socket.ekGameState.deck.splice(0, 1)
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
