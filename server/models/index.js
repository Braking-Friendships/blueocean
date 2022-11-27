// import db.js when created
const { User, Room } = require("../db/db.js");

module.exports = {
  createUser: async (user) => {
    try {
      const filter = { firebase_id: user.firebase_id };
      return await User.findOneAndUpdate(filter, user, { upsert: true });
    } catch (error) {
      return error;
    }
  },
  getUserData: async (user) => {
    console.log("user: ", user);
    try {
      const filter = { firebase_id: user.firebase_id };
      return await User.find(filter);
    } catch (error) {
      return error;
    }
  },
  searchProfile: async (user) => {
    console.log("Search user: ", user);
    try {
      const filter = { username: user.username };
      return await User.find(filter);
    } catch (error) {
      return error;
    }
  },
  updateUser: async (user) => {
    try {
      const filter = { firebase_id: user.firebase_id };
      return await User.findOneAndUpdate(filter, user);
    } catch (error) {
      return error;
    }
  },
  updateFriendList: async (user) => {
    try {
      const filter = { firebase_id: user.firebase_id };
      return await User.findOneAndUpdate(filter, user);
    } catch (error) {
      return error;
    }
  },
  getFriendData: async (user) => {
    console.log("friend: ", user);
    try {
      const filter = { username: user.username };
      return await User.find(filter);
    } catch (error) {
      return error;
    }
  },
  createRoom: async (room) => {
    console.log('creating room', room)
    try {
      return await Room.create(room);
    } catch (error) {
      return error;
    }
  },
  addPlayer: async (room, player) => {
    // player._id = false;
    try {
      return await Room.updateOne({room: room}, { $addToSet: {players: player}})
    } catch {
      return error;
    }
  },
  getRoomData: async (room) => {
    try {
      const filter = { room: room };
      return await Room.find(filter);
    } catch (error) {
      return error;
    }
  },
  getAllRooms: async () => {
    try {
      return await Room.find();
    } catch (error) {
      return error;
    }
  },

  // CREATE FAKE DUMMY DATA
  createDummyData: async (user) => {
    try {
      const filter = { firebase_id: user.firebase_id };
      // await User.drop();
      await User.findOneAndUpdate(filter, user, { upsert: true });
      return;
    } catch (error) {
      return error;
    }
  },
};
