const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
require('express-async-errors')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const postedBlog = request.body
  const blog = new Blog({
    title: postedBlog.title,
    author: postedBlog.author,
    url: postedBlog.url,
    likes: postedBlog.likes ? postedBlog.likes : 0
  })
  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

module.exports = blogsRouter