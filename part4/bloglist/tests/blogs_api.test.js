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
describe('GET Request', () => {

  test('returns all blogs as JSON', async () => {
    const response = await api.get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    expect(response.body).toHaveLength(hardCodedBlogs.length)
  })

  test('returns blogs with id property', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })
})

describe('POST Request', () => {

  test('Increases size of DB', async () => {
    const initialBlogList = await api.get('/api/blogs')
    const newBlog = {
      title: 'test blog',
      author: 'me',
      url: 'no',
      likes: 1111111,
    }
    await api.post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const updatedBlogList = await api.get('/api/blogs')
    expect(updatedBlogList.body).toHaveLength(initialBlogList.body.length + 1)
  }),

  test('adds content of the blog to the DB', async () => {
    const newBlog = {
      title: 'unique',
      author: 'me',
      url: 'idk',
      likes: 42
    }
    await api.post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const updatedBlogList = await api.get('/api/blogs')
    expect(updatedBlogList.body.map(blog => blog.title))
      .toContain('unique')
  })

  test('a blog without likes property defaults to 0', async () => {
    const blogWithoutLikes = {
      title: 'unliked',
      url: 'somewhere'
    }
    await api.post('/api/blogs')
      .send(blogWithoutLikes)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const updatedBlogList = await api.get('/api/blogs')
    const newBlog = updatedBlogList.body.find(blog => blog.title === 'unliked')
    expect(newBlog.likes).toEqual(0)
  })
  test('a blog without title is not added', async () => {
    const untitledBlog = {
      author: 'Foo',
      likes: 10000000
    }
    api.post('/api/blogs')
      .send(untitledBlog)
      .expect(400)

    const blogListAfter = await api.get('/api/blogs')
    expect(blogListAfter.body).toHaveLength(hardCodedBlogs.length)
  })

})
