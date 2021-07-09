const mongoose = require('mongoose');

const userSchema = mongoose.Schema({

  username: {
    type: String
  },
  password: {
    type: String
  },
  email: {
    type: String
  },
  role: {
    type: Number
  }

})

module.exports = mongoose.model( 'users', userSchema)