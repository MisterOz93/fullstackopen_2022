require('express-async-errors')
const notesRouter = require('express').Router()
const Note = require('../models/note')
const User = require('../models/user')


notesRouter.get('/', async (req, res) => {
  const notes = await Note.find({}).populate('user', { username: 1, name: 1 })
  res.json(notes)
})

notesRouter.get('/:id', async (req, res) => {
  const note = await Note.findById(req.params.id)
  return note ? res.json(note) : res.status(404).end()
})

notesRouter.delete('/:id', async (req, res) => {
  await Note.findByIdAndRemove(req.params.id)
  res.status(204).end()
})

notesRouter.post('/', async (req, res) => {

  const user = await User.findById(req.body.userId)
  console.log(req.body)
  const note = new Note({
    content: req.body.content,
    important: req.body.important || false,
    date: new Date(),
    user: user._id
  })

  const savedNote = await note.save()
  user.notes = user.notes.concat(savedNote._id)
  await user.save()
  res.status(201).json(savedNote)
})

notesRouter.put('/:id', async (req, res) => {

  const body = req.body
  const note = {
    content: body.content,
    important: body.important
  }
  const updatedNote = await Note.findByIdAndUpdate(
    req.params.id,
    note,
    { new: true, runValidators: true, context: 'query' }
  )
  res.json(updatedNote)
})

module.exports = notesRouter