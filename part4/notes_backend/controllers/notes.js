require('express-async-errors')
const notesRouter = require('express').Router()
const Note = require('../models/note')


notesRouter.get('/', async (req, res) => {
  const notes = await Note.find({})
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

  const note = new Note({
    content: req.body.content,
    important: req.body.important || false,
    date: new Date(),
  })
  const savedNote = await note.save()
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