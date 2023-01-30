const express = require('express')
const cors = require('cors')
const { anecdotes } = require('./data')
const app = express()
const mongoose = require('mongoose')
const mongourl = `mongodb+srv://MisterOz93:${process.argv[2]}@cluster0.oldzd.mongodb.net/?retryWrites=true&w=majority`
const PORT = process.env.PORT || 3001

//app.use(express.static('build')) dont use build while refactoring
app.use(express.json())
app.use(cors())

app.get('/anecdotes', (req, res) => {
   return res.json(anecdotes)
})
app.get('/health', (req, res ) => {
  return res.status(200).send('Ok')
})

app.put('/anecdotes/:id', (req, res) => {
    console.log('req body', req.body)
    const anecdote = anecdotes.find(a => a.id === req.params.id)
    if (!anecdote){
        return res.status(400).send('Could not find anecdote with that ID on server')
    }
    
    anecdotes.map(a => a.id !== req.params.id ? a: req.body)
    return res.json(req.body)
})

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`server started on port ${PORT}`)
})
