const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

require('./db');
require('./models/Users');

app.use(bodyParser.json());

const authRoutes = require('./routes/authRoutes');
app.use(authRoutes);

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/api', (req, res) => {
  res.send('Hello World');
  console.log(req.body);
});
app.get('signup', (req, res) => {
  req.send('Hello World');
});
app.get('/signin', (req, res) => {
  res.send('Hello World');
  console.log(req.body);
});

app.listen(port, () => {
  console.log('Server started at port ' + port);
});
