const models = require('../models');

module.exports.controller = {
  createUser: (user) => {
    return models.createUser(user)
      .then(result => {
        // console.log('User created')
        return result;
      })
      .catch(error => console.log('Error creating user'));
  },
  getUserData: (user) => {
    return models.getUserData(user)
      .then(result => {
        // console.log(result, 'result in controller');
        return result;
      })
      .catch(error => console.log(error));
  },
  updateUser: (user) => {
    return models.createUser(user)
      .then(result => {
        // console.log('User created')
        return result;
      })
      .catch(error => console.log('Error creating user'));
  },
  getFriendData: (user) => {
    return models.getFriendData(user)
      .then(result => {
        // console.log(result, 'result in controller');
        return result;
      })
      .catch(error => console.log(error));
  },
  createRoom: (room) => {
    return models.createRoom(room)
      .then(result => {
        console.log('Room created')
        return result;
      })
      .catch(error => console.log('Error creating room'));
  },
  addPlayer: (room, player) => {
    return models.addPlayer(room, player)
      .then(result => {
        console.log('player added to room')
        return result;
      })
      .catch(error => console.log('Error adding player'));
  },
  getRoomData: (room) => {
    return models.getRoomData(room)
      .then(result => {
        // console.log(result, 'result in controller');
        return result;
      })
      .catch(error => console.log(error));
  },




  // CREATE FAKE DUMMY DATA
  createDummyData: (user) => {
    return models.createDummyData(user)
      .then(result => {
        // console.log('User Dummy Data created');
        return result;
      })
      .catch(error => console.log('Error creating user'));
  },
};