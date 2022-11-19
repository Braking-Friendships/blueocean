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
  username: String,
  firstName: String,
  lastName: String,
  avatar: {
    type: String,
    default: '',
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


module.exports = { db, User };