const express = require('express');
const router = require('./routes.js')
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', router)

app.listen(5001, () => {
  console.log('Server started on port 5001')
})