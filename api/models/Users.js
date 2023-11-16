const mongoose = require('mongoose');
const users = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  codecheflink: {
    type: String,
    required: true,
  },
  codeforceslink: {
    type: String,
    required: true,
  },

  leetcodelink: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model('users', users);
