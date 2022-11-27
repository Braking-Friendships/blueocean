import { io } from 'socket.io-client';

export const socket = io('http://localhost:5001');

socket.on('connect', () => {
  // console.log('connected', socket.id)
})

export const emitters = {
  getUserData: (user) => socket.emit('get-user-data', user),
  getFriendData: (friend) => socket.emit('get-friend-data', friend),
  createUser: (user) => socket.emit('create-user', user),
  editUserInfo: (user) => socket.emit('edit-user', user),
  addFriend: (user) => socket.emit('add-friend', user),
  removeFriend: (user) => socket.emit('remove-friend', user),
  searchProfile: (user) => socket.emit('search-user', user),
  hostRoom: () => socket.emit('host-room', socket.id),
  joinRoom: (roomId) => socket.emit('join-room', roomId),
  startGame: (gameState) => socket.emit('start-game', gameState),
  endGame: () => socket.emit('end-game'),
  returnLobby: () => socket.emit('return-lobby'),
  updateSocket: (gameState) => socket.emit('update-socket', gameState),
  playCard: (userCardType, userCardIdxs, affectedUser, affectedUserIdx, insertIdx) => socket.emit('play-card', userCardType, userCardIdxs, affectedUser, affectedUserIdx, insertIdx),
  defuse: (insertIdx, userCardIdxs) => socket.emit('defuse', insertIdx, userCardIdxs),
  nope: (user, userCardIdxs)=> socket.emit('nope-played', user, userCardIdxs),
  clearInterval: ()=>socket.emit('clear-card-interval'),
  drawCard: (username) => socket.emit('draw-card', username),
  playerLoses: (username) => socket.emit('player-loses', username),
  // chat emmiters -----
  handleBroadSubmit: (message, room) => socket.emit('send-chat-message', message, room),
  handleRmSubmit: (room) => socket.emit('join-room', room, message => console.log(message, 'ROOM SUBMIT MESSAGE SENT')),
  // -------------------
}