const mongoose = require('mongoose')

const mongoURL = process.env.MONGO_URI

mongoose.connect(mongoURL).then( () => console.log('Connected to MongoDB'))

const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    minLength: 1,
    required: true
  },
  date: {
    type: Date,
    required: true,
  },
  important: Boolean,
})

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Note', noteSchema)
