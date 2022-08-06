const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({})//add populate method here
  response.status(200).json(users)
})

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body
  if (!password){
    return response.status(400).json({ error: 'missing password' })
  }
  const existingUser = await User.findOne({ username })

  if (existingUser){
    return response.status(400).json({ error: 'Username already taken'
    })
  }
  const passwordHash = await bcrypt.hash(password, 10)
  const user = new User({ username, name, passwordHash })
  const savedUser = await user.save()
  response.status(201).json(savedUser)
})

module.exports = usersRouter