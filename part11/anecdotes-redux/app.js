const express = require('express')
const cors = require('cors')
require('dotenv').config()
const Anecdote = require('./models/anecdote')
const app = express()
const mongoose = require('mongoose')
const { response } = require('express')
const mongoUrl = process.env.MONGO_URI
const PORT = process.env.PORT || 3001

mongoose.connect(mongoUrl).then(() => console.log('MongoDB connected'))

app.use(express.static('build'))
app.use(express.json())
app.use(cors())

app.get('/anecdotes', async (req, res) => {
  const anecdotes = await Anecdote.find({})
  return res.json(anecdotes)
})

app.get('/health', (req, res ) => {
  return res.status(200).send('Ok')
})

app.post('/anecdotes', async (req, res) => {
  const body = req.body
  if (!body){
    return response.status(400).json('Request was missing an anecdote')
  }
  const newAnecdote = new Anecdote({content: body.content, votes: body.votes })
  await newAnecdote.save()
  return res.json(newAnecdote)
})

app.put('/anecdotes/:id', async (req, res) => {
  const body = req.body

  if (!body){
    return res.status(400).json('Request was missing anecdote information')
  }

  const anecdote = {
    content: body.content,
    votes: body.votes,
    id: body.id
  }

  const updatedAnecdote = await Anecdote.findByIdAndUpdate(req.params.id, anecdote, {new : true})   
  res.json(updatedAnecdote)
   
})

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`server started on port ${PORT}`)
})
