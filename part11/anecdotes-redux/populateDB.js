const mongoose = require('mongoose')
const Anecdote = require('./models/anecdote')
const { anecdotes } = require('./data')

const populateDB = async () => {
    const anecdoteObjects = anecdotes.map(a => new Anecdote(a))
    const promiseArray = anecdoteObjects.map(a => a.save())
    await Promise.all(promiseArray)
    mongoose.connection.close()
}

mongoose.connect(`mongodb+srv://MisterOz93:${process.argv[2]}@cluster0.oldzd.mongodb.net/anecdotes_exercise_app?retryWrites=true&w=majority`)

populateDB()
