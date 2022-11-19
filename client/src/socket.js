import { io } from 'socket.io-client';

export const socket = io('http://localhost:5001');

socket.on('connect', () => {
  console.log('connected')
})

export const emitters = {
  getUserData: (user) => socket.emit('get-user-data', user),
  createUser: (user) => socket.emit('create-user', user),
  startGame: (gameState) => socket.emit('start-game', gameState),
  endGame: () => socket.emit('end-game'),
  playCard: (username, card, cardIdx) => socket.emit('play-card', username, card, cardIdx),
  drawCard: (username) => socket.emit('draw-card', username),
  playerLoses: (username) => socket.emit('player-loses', username)
}