const bcrypt = require('bcrypt')
const User = require('../models/user')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')

const api = supertest(app)

describe('when there is one user in DB', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('secret', 10)
    const user = new User( { username: 'First User', passwordHash })
    await user.save()
  })

  test ('user can be created and is saved to DB', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'Second User',
      name: 'Su',
      password: 'himitsu'
    }
    await api.post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
    expect(usersAtEnd.map(user => user.username)).toContain('Second User')
  })

  test('user creation fails if username is already taken', async() => {
    const usersAtStart = await helper.usersInDb()
    const duplicateUser = {
      username: 'First User',
      name: 'Foo',
      password: 'password'
    }

    const result = await api.post('/api/users')
      .send(duplicateUser)
      .expect(400)
      .expect('Content-type', /application\/json/)
    expect(result.body.error).toContain('username must be unique')
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtStart).toEqual(usersAtEnd)
  })
})