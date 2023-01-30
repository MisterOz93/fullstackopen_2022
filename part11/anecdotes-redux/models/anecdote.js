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

    schema.set('toJSON', {
        transform: (document, returnedObject) => {
            returnedObject.id = returnedObject._id.toString();
            delete returnedObject._id
            delete returnedObject.__v
        }
    })
   

module.exports = mongoose.model('Anecdote', schema)
