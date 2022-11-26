import { io } from 'socket.io-client';

export const socket = io('http://localhost:5001');

socket.on('connect', () => {
  console.log('connected', socket.id)
})

export const emitters = {
  getUserData: (user) => socket.emit('get-user-data', user),
  createUser: (user) => socket.emit('create-user', user),
  editUserInfo: (user) => socket.emit('edit-user', user),
  addFriend: (user) => socket.emit('add-friend', user),
  searchProfile: (user) => socket.emit('search-user', user),
  hostRoom: () => socket.emit('host-room', socket.id),
  joinRoom: (roomId) => socket.emit('join-room', roomId),
  startGame: (gameState) => socket.emit('start-game', gameState),
  endGame: () => socket.emit('end-game'),
  playCard: (userCardType, userCardIdxs, affectedUser, affectedUserIdx, insertIdx) => socket.emit('play-card', userCardType, userCardIdxs, affectedUser, affectedUserIdx, insertIdx),
  defuse: (insertIdx, userCardIdxs) => socket.emit('defuse', null, userCardIdxs),
  nope: (userCardType, userCardIdxs)=> socket.emit('nope-played', userCardType, userCardIdxs),
  drawCard: (username) => socket.emit('draw-card', username),
  playerLoses: (username) => socket.emit('player-loses', username),
  // chat emmiters -----
  handleBroadSubmit: (message, room) => socket.emit('send-chat-message', message, room),
  handleRmSubmit: (room) => socket.emit('join-room', room, message => console.log(message, 'ROOM SUBMIT MESSAGE SENT')),
  // -------------------
}