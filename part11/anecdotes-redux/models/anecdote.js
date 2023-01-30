const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
    votes: {
    type: Number,
  },
})

module.exports = mongoose.model('Anecdote', schema)
