const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/braking_friendships');

const db = mongoose.connection;

db.on('error', () => {
  console.log('mongoose connection error');
});

db.once('open', () => {
  console.log('mongoose connected successfully');
});

const userSchema = mongoose.Schema({
  email: String,
  firebase_id: String,
  username: {
    type: String,
    unique: true,
    required: true,
  },
  firstName: String,
  lastName: String,
  avatar: {
    type: String,
    default: '/static/media/happyCat.2c53228aef54c3bfef6c.png',
  },
  friends: [String],
  total_games: {
    type: Number,
    default: 0,
  },
  total_wins: {
    type: Number,
    default: 0,
  },
});

const User = mongoose.model('User', userSchema);

const roomSchema = mongoose.Schema({
  room: String,
  host: String,
  players: [{
    username: String,
    avatar: String,
    socketId: String,
    fireId: String,
  }]
});

const Room = mongoose.model('Room', roomSchema);


module.exports = { db, User, Room };