const models = require('../models');

module.exports.controller = {
  createUser: (user) => {
    return models.createUser(user)
      .then(result => {
        console.log('User created')
        return result
      })
      .catch(error => console.log('Error creating user'))
  },
  getUserData: (user) => {
    return models.getUserData(user)
      .then(result => {
        console.log(result, 'result in controller')
        return result
      })
      .catch(error => console.log(error))
  }
}