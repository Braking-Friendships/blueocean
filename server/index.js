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

const shuffle = (targetArray) => {
  let i = targetArray.length;
  while(i > 0) {
    let idxToSwitch = Math.floor(Math.random() * targetArray.length);
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
    // we might not need prevTurns since nope just cancels a move before it's effect is played
    gameState.prevTurns = [];

    socket.ekGameState = gameState;
    socket.ekGameState.currentPlayer = gameState.playerOrder.shift()

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

  const drawCard = (username = 'hand1') => {
    //Would have to check for bomb before moving on. In which case it would prompt user to defuse.
    let newCard = socket.ekGameState.deck.pop();
    let deck = socket.ekGameState.deck;


    if(newCard.type === 'bomb'){
      //Emit the bomb
      socket.emit('bomb', newCard)

      let timer = 10;
      const bombTimer = setInterval(() => {
        // if attack count > 0 and cardType !== attack {reset attack count}
        socket.emit('countdown', timer)
        console.log(timer)

        timer--;

        if(timer < 0) {
          // player loses
          // remove player from order and delete player hand
          clearInterval(bombTimer);
          socket.ekGameState.playerOrder = socket.ekGameState.playerOrder.filter((user) => {
            return user !== username;
          })
          socket.ekGameState[username] = null;

          endTurn();
        }
      }, 1000);

      socket.on('defuse', (insertIdx, userCardIdxs) => {
        console.log('defuse detected')
        clearInterval(bombTimer);
        socket.ekGameState['hand1'].splice(userCardIdxs[0], 1);

        socket.ekGameState.deck = deck.slice(0, insertIdx).concat([newCard]).concat(deck.slice(insertIdx));
        endTurn();
      })
      //it should remain on their turn so we can just
      // end function?


      //somewhere else we can say if they play defuse, we go next player.
      //Lets extract the logic to switch turns to a new function, for use in skip, bomb/defuse, (attack?)
    } else {
      socket.ekGameState[username].push(newCard);
      endTurn();
    }

  }

  const endTurn = () => {
    let currPlayer = socket.ekGameState.currentPlayer;
    const playerOrder = socket.ekGameState.playerOrder;

    console.log('Player order before:', socket.ekGameState.playerOrder)

    if (currPlayer !== playerOrder[playerOrder.length - 1]) {
      playerOrder.push(currPlayer);
    }
    // Set current player
    socket.ekGameState.currentPlayer = playerOrder.shift();
    emitState(socket.ekGameState);
    console.log('Player order after:', socket.ekGameState.playerOrder)
    console.log('Current player:', socket.ekGameState.currentPlayer)
    // reset attack counter if attack wasn't played
  }

  const playCard = (userCardType, userCardIdxs, affectedUser, affectedUserIdx, insertIdx) => {
    const gameState = socket.ekGameState;
    const deck = socket.ekGameState.deck;
    const playerHand = socket.ekGameState['hand1']
    const playerOrder = socket.ekGameState.playerOrder;
    const currPlayer = socket.ekGameState.currentPlayer;
    console.log('--->', userCardType, userCardIdxs, affectedUser, affectedUserIdx, insertIdx);
    // TODO: draw card only on end turn, don't assume a cardtype played means turn is over

    //Emit the action to all players, so they can see the card
    let tempTurn = {
      userCardType: userCardType ?? '',
      userCardIdxs: userCardIdxs ?? [],
      affectedUser: affectedUser ?? '',
      affectedUserIdx: affectedUserIdx ?? '',
      insertIdx: insertIdx ?? ''
    }
    //emit just this object

    // Remove played cards from user's hand
    socket.ekGameState['hand1'] = socket.ekGameState['hand1'].filter((card, i) => {
      if(!userCardIdxs.includes(i)) {
        return true;
      }
    })
    emitState(socket.ekGameState)

    // SANS ATTACK
    // [3, 0, 2, 1]
    // [0, 2, 1, 3]

    // WITH ATTACK
    // [3, 0, 2, 1]
    // [0, 0, 2, 1, 3]




    // Set 5 second timer after calling playCard and emit the count down
    let timer = 5;

    const x = setInterval(() => {
      // if attack count > 0 and cardType !== attack {reset attack count}
      socket.emit('countdown', timer)
      console.log(timer)
      timer -= 1;
      if (timer < 0) {
        clearInterval(x);
        console.log('timer up')
        switch (userCardType) {
          case 'attack':
            // increment attack count

            // loop through and remove elements that are identical until they aren't
            // unshift for next player attack count * 2 - 1

            // [0, 1, 2]

            // attack count = 1 (add 1)

            // attack count = 2 (add 3)

            // attack count = 3 (add 5)

            // attack count = 4 (add 7)

            // add attack count * 2 - 1 to the next player

            // [1, 1, 2, 0]

            endTurn();
            break;
          case 'defuse':
            // insert bomb card at insertidx
            // const bomb = deck.splice(0, 1)
            //Bomb should already be drawn before defuse is played.
            const bomb = {}
            const copy = deck.slice(0, insertIdx).concat(bomb[0]).concat(deck.slice(insertIdx))
            socket.ekGameState.deck = copy;
            break;
          case 'favor':
            // remove card from affectedPlayer and give it to current player
            const giveCard = socket.ekGameState['hand2'].splice(0, 1)
            socket.ekGameState['hand1'].push(giveCard[0])
            // pass in user to drawCard once we have a working data structure for gamestate
            break;
          case 'future':
            // show player next three cards
            break;
          case 'skip':
            endTurn();
            break;
          case 'shuffle':
            shuffle(socket.ekGameState.deck)
            break;
          default:
            const stealCard = socket.ekGameState['hand2'].splice(affectedUserIdx, 1);
            socket.ekGameState['hand1'].push(stealCard[0]);
            break;
        }
         // Update prevTurns
        socket.ekGameState.prevTurns.push(tempTurn)
        emitState(socket.ekGameState);
      }
    }, 1000)

    socket.on('nope-played', (userCardType, userCardIdxs) => {
      clearInterval(x)
      socket.ekGameState.prevTurns.push({
        userCardType: userCardType ?? '',
        userCardIdxs: userCardIdxs ?? [],
        affectedUser: affectedUser ?? '',
        affectedUserIdx: affectedUserIdx ?? '',
        insertIdx: insertIdx ?? ''
      })
      emitState(socket.ekGameState);
      console.log('cancelled play')
    })
    // also emit the card that was played


    // Set current player

    // [0, 3, 2, 1]


    // player order as array
    // current player is unshift playerorder
    // attack is just an insert of 10

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
  // socket.on('join-room', (room, cb) => {
  //   socket.join(room);
  //   cb(`Joined ${room}`)
  // })
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
  socket.on('edit-user', async user => {
    console.log('~~ EDIT USER ~~ ', user);
    const createUser = await controller.updateUser(user)
    const userData = await controller.getUserData(user)
    console.log(userData)
    socket.emit('send-user-data', userData)
  })
  socket.on('post-edit-avatar', async user => {
    const createUser = await controller.updateUser(user)
    const userData = await controller.getUserData(user)
    console.log(userData)
    socket.emit('send-user-data', userData)
  })



  // ROOM LISTENERS
  socket.on('host-room', userObj => {
    const roomId = uid();
    socket.join(roomId);
    const roomObj = {
      room: roomId,
      host: userObj.socketId,
      players:[userObj]
    }
    controller.createRoom(roomObj);
    console.log('Rooms available', io.of('/').adapter.rooms)
  })
  // socket.on('join-room', roomId => {
  //   socket.join(roomId)
  //   // console.log('Sockets in room', io.of(`/${roomId}`).adapter.sids)
  // })
  socket.on('join-room', async userObj => {
    console.log(userObj)
    socket.join(`${userObj.room}`)
    const sendUpdate = await controller.addPlayer(userObj.room, userObj)
    const roomData = await controller.getRoomData(userObj.room)
    io.in(`${userObj.room}`).emit('joined', roomData);
    // console.log('players in room after joining', io.of('/').adapter.rooms)
  })

    // socket.to(`${userObj.room}`).emit('joined', (userObj))


  socket.on('join-game', (room) => {
    console.log(room, 'room')
    socket.to(`${room}`).emit('start-join', (room))
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
  socket.on('play-card', (userCardType, userCardIdxs, affectedUser, affectedUserIdx, insertIdx) => {
    console.log('in play-card', insertIdx)
    playCard(userCardType, userCardIdxs, affectedUser, affectedUserIdx, insertIdx)
  })
  socket.on('draw-card', (username) => {
    drawCard();
    // socket.ekGameState['hand1'].push(socket.ekGameState.deck[0])
    // socket.ekGameState.deck.splice(0, 1)
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
