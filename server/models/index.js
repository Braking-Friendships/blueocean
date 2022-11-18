// import db.js when created
const { User } = require('../db/db.js')

module.exports = {
  test: async (callback) => {
    try {
      callback(null, 'Success in model')
    } catch (error) {
      callback(error, null);
    }
  },
  postTest: async (body, callback) => {
    try {
      const filter = {email: body.email};

      const result = await User.findOneAndUpdate(filter, body, {upsert: true})

      callback(null, result);
    } catch (error) {
      callback(error, null);
    }
  }
}