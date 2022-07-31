//cont. from Eliminating the try-catch
const notesRouter = require('express').Router()
const Note = require('../models/note')


notesRouter.get('/', async (req, res) => {
  const notes = await Note.find({})
  res.json(notes)
})

notesRouter.get('/:id', async (req, res, next) => {
  try {
    const note = await Note.findById(req.params.id)
    return note ? res.json(note) : res.status(404).end()
  } catch(error){
    next(error) }
})

notesRouter.delete('/:id', async (req, res, next) => {
  try {
    await Note.findByIdAndRemove(req.params.id)
    res.status(204).end()
  } catch(error) {
    next(error)
  }
})

notesRouter.post('/', async (req, res, next) => {

  const note = new Note({
    content: req.body.content,
    important: req.body.important || false,
    date: new Date(),
  })
  try {
    const savedNote = await note.save()
    res.status(201).json(savedNote)
  }
  catch(error) {
    next(error)
  }
})

notesRouter.put('/:id', (req, res, next) => {

  const body = req.body
  const note = {
    content: body.content,
    important: body.important
  }
  Note.findByIdAndUpdate(
    req.params.id,
    note,
    { new: true, runValidators: true, context: 'query' }
  )
    .then(updatedNote => {
      res.json(updatedNote)
    }).catch(error => next(error))

})

module.exports = notesRouter