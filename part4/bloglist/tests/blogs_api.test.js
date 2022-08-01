const hardCodedBlogs = require('../utils/list_helper').blogs
const superTest = require('supertest')
const Blog = require('../models/blog')
const app = require('../app')
const api = superTest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  for (let blog of hardCodedBlogs){
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

test('GET request returns all blogs as JSON', async () => {
  const response = await api.get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
  expect(response.body).toHaveLength(hardCodedBlogs.length)
})