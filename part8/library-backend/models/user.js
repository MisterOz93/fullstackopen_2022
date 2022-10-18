const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minLength: 3,
  },
  favouriteGenre: {
    type: String,
    required: true,
  },
})

module.exports = new mongoose.model('User', schema)
