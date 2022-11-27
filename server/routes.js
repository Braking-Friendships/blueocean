const {controller} = require('./controllers/index.js');
const router = require('express').Router();
const { Socket } = require('socket.io');
const messageController = require('./controllers/messages')

// router.get('/test', controller.test);
// router.post('/test', controller.postTest);

const socketRouter = async (socket = Socket) => {
  console.log('socketid is', socket.id)

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
  })
  socket.on('player-loses', (username) => {
    console.log(username, 'lost')
  })
}



module.exports.socketRouter = socketRouter;
module.exports.router = router;