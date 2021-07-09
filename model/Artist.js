const mongoose = require('mongoose');

const artistSchema = mongoose.Schema({

  artistName: {
    type: String
  },
  artistCode: {
    type: String
  },
  workDays: {
    type: String
  },
  workProgress: {
    type: Number
  },
  email: {
    type: String
  },
  commissionSheet: {
    type: String
  }

})

module.exports = mongoose.model( 'artist', artistSchema)