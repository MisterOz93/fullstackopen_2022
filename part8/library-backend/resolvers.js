const { UserInputError } = require('apollo-server')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const jwt = require('jsonwebtoken')
const { JWT_KEY } = require('./utils/config')
const { PubSub } = require('graphql-subscriptions')

const pubsub = new PubSub()

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
        return await Book.find({}).populate('author')
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
        return Book.find({ genres: { $in: args.genre } }).populate('author')
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
          console.log('error here')
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
      pubsub.publish('BOOK_ADDED', { bookAdded: newBook })
      return newBook
    },

    editAuthor: async (root, args, context) => {
      //console.log('received mutation query:', args.name, args.setBornTo)
      if (!context.currentUser) {
        throw new UserInputError('Must be Logged In to perform operation', {
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
      console.log('log in successful as', userForToken)
      return {
        value: jwt.sign(userForToken, JWT_KEY),
      }
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED'),
    },
  },
}

module.exports = resolvers
