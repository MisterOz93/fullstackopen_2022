const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('notes', { content: 1, date: 1 })
  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body
  const passwordHash = await bcrypt.hash(password, 10)

  const existingUser = await User.findOne({ username })

  if (existingUser){
    return response.status(400).json({
      error: 'username must be unique'
    })
  }
  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

module.exports = usersRouter