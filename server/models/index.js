// import db.js when created
const { User } = require('../db/db.js');
// use dummyData
const dummyData = require('../dummyData.js');

module.exports = {
  createUser: async (user) => {
    try {
      const filter = {firebase_id: user.firebaseId};
      console.log('dummyData: ', dummyData.users);
      // return await User.findOneAndUpdate(filter, user, {upsert: true})
    } catch (error) {
      return error
    }
  },
  getUserData: async (user) => {
    console.log('user: ', user);
    try {
      const filter = {firebase_id: user.firebaseId}
      return await User.find(filter)
    } catch (error) {
      return error
    }
  }
}