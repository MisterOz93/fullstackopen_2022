//cont from
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Note = require('../models/note')
const api = supertest(app)
const helper = require('./test_helper')



beforeEach(async () => {
  await Note.deleteMany({})
  for (let note of helper.initialNotes){
    let noteObject = new Note(note)
    await noteObject.save()
  }
})

test('notes are returned as JSON', async () => {
  console.log('Starting tests')
  await api.get('/api/notes')
    .expect(200)
    .expect('Content-type', /application\/json/)
})

test('All notes are returned', async () => {
  const response = await api.get('/api/notes')
  expect(response.body).toHaveLength(helper.initialNotes.length)
})

test('a specific note is within the returned notes', async () => {
  const response = await api.get('/api/notes')
  expect(response.body.map(note => note.content))
    .toContain('Browser can execute only Javascript')
})

test('a valid note can be added', async () => {
  const newNote = {
    content: 'async/await rules!',
    important: 'true',
  }
  await api.post('/api/notes')
    .send(newNote)
    .expect(201)
    .expect('Content-type', /application\/json/)

  const notesAtEnd = await helper.notesInDb()
  const noteContents = notesAtEnd.map(note => note.content)
  expect(notesAtEnd).toHaveLength(helper.initialNotes.length + 1)
  expect(noteContents).toContain('async/await rules!')
})

test('a note without content will not be added', async () => {
  const illegalNote = {
    important: false
  }
  await api.post('/api/notes')
    .send(illegalNote)
    .expect(400)
  const notesAtEnd = await helper.notesInDb()
  expect(notesAtEnd).toHaveLength(helper.initialNotes.length)
})

test('a specific note can be viewed', async () => {
  const notesAtStart = await helper.notesInDb()
  const noteToView = notesAtStart[0]
  const resultNote = await api
    .get(`/api/notes/${noteToView.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)
  expect(resultNote.body).toEqual(JSON.parse(JSON.stringify(noteToView)))
})

test('a note can be deleted', async () => {
  const notesAtStart = await helper.notesInDb()
  const noteToDelete = notesAtStart[0]
  await api.delete(`/api/notes/${noteToDelete.id}`)
    .expect(204)

  const notesAtEnd = await helper.notesInDb()
  expect(notesAtEnd).toHaveLength(notesAtStart.length -1)
  expect(notesAtEnd.map(note => note.content)).not.toContain(noteToDelete.content)
})

afterAll(() => {
  mongoose.connection.close()
})