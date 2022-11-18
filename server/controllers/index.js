const models = require('../models');

module.exports.controller = {
  test: (req, res) => {
    models.test((err, data) => {
      if (err) {
        console.log('Error in test get', err)
        res.status(404).end();
      }
      console.log(data)
      res.status(200).send(data);
    })
  },
  postTest: (req, res) => {
    models.postTest(req.body, (err, data) => {
      if (err) {
        console.log('Error in posting', err)
        res.status(404).end();
      }
      console.log(data)
      res.status(201).end();
    })
  }
}