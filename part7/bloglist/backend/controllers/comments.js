const commentsRouter = require('express').Router()
const { response } = require('express')
const Comment = require('../models/comment')
const middleware = require('../utils/middleware')
require('express-async-errors')

commentsRouter.get('/', async (request, response) => {
  const comments = await Comment.find({})
  response.json(comments)
})

commentsRouter.post('/', async (request, response) => {
  const newComment = request.body
  if (!newComment) {
    return response.status(401).json({ error: 'Cannot post empty comment' })
  }
  const comment = new Comment({
    content: newComment.content,
  })

  const savedComment = await comment.save()
  response.status(201).json(savedComment)
})

module.exports = commentsRouter
