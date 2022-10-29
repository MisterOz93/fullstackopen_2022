const { ApolloServer } = require('apollo-server-express')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const Person = require('./models/persons')
const User = require('./models/user')
const { MONGODB_URI } = require('./utils/config')
const JWT_SECRET = 'SUPER_SECRET_KEY'
const typeDefs = require('./schema')
const resolvers = require('./resolvers')

console.log('connecting to', MONGODB_URI)
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB:', error.message)
  })

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id).populate(
        'friends'
      )
      return { currentUser }
    }
  },
})
server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
