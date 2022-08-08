const logger = require('./logger')

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)
  if (error.name === 'CastError'){
    return response.status(400).send({ error: 'malformatted id' })
  }
  if (error.name === 'ValidationError'){
    return response.status(400).send({ error: error.message })
  }
  if (error.name === 'JsonWebTokenError'){
    return response.status(401).json({ error: 'invalid token' })
  }
  if (error.name === 'TokenExpiredError'){
    return response.status(401).json({ error: 'token expired' })
  }
  next (error)
}

const isolateToken = (request, response, next) => {
  const authorization = request.get('authorization')
  request.token = authorization && authorization.toLowerCase().startsWith('bearer ')
    ?
    authorization.substring(7)
    :
    null
  next()
}

module.exports = { errorHandler, isolateToken }