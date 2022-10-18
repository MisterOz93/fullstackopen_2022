//finish exercise by making mutations require log in
const { ApolloServer, UserInputError, gql } = require('apollo-server')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const { MONGODB_URI, JWT_KEY } = require('./utils/config')
/*
The following things do not have to work just yet:

allBooks working with the parameter author 
and 
bookCount field of an author object 

*/
console.log('Connecting to MongoDB')

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB:', error.message)
  })

const typeDefs = gql`
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type User {
    username: String!
    favouriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int
    authorCount: Int
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book

    editAuthor(name: String!, setBornTo: Int!): Author

    createUser(username: String!, favouriteGenre: String!): User

    login(username: String!, password: String!): Token
  }
`

const resolvers = {
  /* temporarily not working
  Author: {
    bookCount: (root) => {
      return books.filter((b) => b.author === root.name).length
    },
  },   */

  Query: {
    bookCount: async () => {
      const size = await Book.find({})
      return size.length
    },
    authorCount: async () => {
      const size = await Author.find({})
      return size.length
    },
    allBooks: async (root, args) => {
      if (!args.author && !args.genre) {
        return await Book.find({})
      }
      /* don't work yet
      if (!args.genre && args.author) {
        return books.filter((b) => b.author === args.author)
      } 

       if (args.author && args.genre) {
        const byAuthor = books.filter((b) => b.author === args.author)
        return byAuthor.filter((b) => b.genres.includes(args.genre))
      } */

      if (!args.author && args.genre) {
        return Book.find({ genres: { $in: args.genre } })
      }
    },

    allAuthors: async () => {
      return await Author.find({})
    },

    me: (root, args, context) => {
      console.log('context for me is,', context)
      return context.currentUser
    },
  },

  Mutation: {
    addBook: async (root, args, context) => {
      if (!context.currentUser) {
        throw new UserInputError('Must be Logged In to perform operaiton', {
          invalidArgs: args,
        })
      }
      //console.log('args are', args)
      const existingAuthor = await Author.findOne({ name: args.author })
      //console.log('existingAuthor is', existingAuthor)
      if (!existingAuthor) {
        console.log('adding author:', args.author)
        const newAuthor = new Author({ name: args.author })
        try {
          await newAuthor.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
      }
      const author = await Author.findOne({ name: args.author })
      //console.log('author after saving to db is', author)
      const newBook = new Book({
        ...args,
        author: author,
      })
      try {
        await newBook.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return newBook
    },

    editAuthor: async (root, args, context) => {
      //console.log('received mutation query:', args.name, args.setBornTo)
      if (!context.currentUser) {
        throw new UserInputError('Must be Logged In to perform operaiton', {
          invalidArgs: args,
        })
      }
      const author = await Author.findOne({ name: args.name })
      if (!author) {
        throw new UserInputError('could not find author in database')
      }
      //console.log('author from db is', author)
      author.born = args.setBornTo
      //console.log('updated author:', author)
      try {
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return author
    },

    createUser: async (root, args, context) => {
      const existingUser = await User.findOne({ username: args.username })
      if (existingUser) {
        throw new UserInputError('Username Taken')
      }
      const newUser = new User({ ...args })
      try {
        await newUser.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return newUser
    },

    login: async (root, args, context) => {
      const user = await User.findOne({ username: args.username })
      if (!user || args.password !== 'password') {
        throw new UserInputError('Invalid Username or Password')
      }
      const userForToken = {
        username: user.username,
        id: user._id,
      }
      return {
        value: jwt.sign(userForToken, JWT_KEY),
      }
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_KEY)
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  },
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
