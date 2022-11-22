// import db.js when created
const { User } = require('../db/db.js');

module.exports = {
  createUser: async (user) => {
    try {
      const filter = {firebase_id: user.firebaseId};
      return await User.findOneAndUpdate(filter, user, {upsert: true});
    } catch (error) {
      return error;
    }
  },
  getUserData: async (user) => {
    console.log('user: ', user);
    try {
      const filter = {firebase_id: user.firebaseId};
      return await User.find(filter);
    } catch (error) {
      return error;
    }
  },
  updateUser: async (user) => {
    try {
      const filter = {username: user.firebaseId};
      return await User.findOneAndUpdate(filter, user);
    } catch (error) {
      return error;
    }
  },
  getFriendData: async (user) => {
    console.log('friend: ', user);
    try {
      const filter = {username: user.username};
      return await User.find(filter);
    } catch (error) {
      return error;
    }
  },







  // CREATE FAKE DUMMY DATA
  createDummyData: async (user) => {
    try {
      const filter = {firebase_id: user.firebaseId};
      // await User.drop();
      await User.findOneAndUpdate(filter, user, {upsert: true});
      return
    } catch (error) {
      return error;
    }
  },
}