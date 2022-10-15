const { ApolloServer, gql } = require('apollo-server')
const Book = require('./models/book')
const Author = require('./models/author')
const mongoose = require('mongoose')
const { MONGODB_URI } = require('./utils/config')
/*
The following things do not have to work just yet:

allBooks query with parameters
bookCount field of an author object
author field of a book
editAuthor mutation

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
/*let authors = [
  {
    name: 'Robert Martin',
    id: 'afa51ab0-344d-11e9-a414-719c6709cf3e',
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: 'afa5b6f0-344d-11e9-a414-719c6709cf3e',
    born: 1963,
  },
  {
    name: 'Fyodor Dostoevsky',
    id: 'afa5b6f1-344d-11e9-a414-719c6709cf3e',
    born: 1821,
  },
  {
    name: 'Joshua Kerievsky', // birthyear not known
    id: 'afa5b6f2-344d-11e9-a414-719c6709cf3e',
  },
  {
    name: 'Sandi Metz', // birthyear not known
    id: 'afa5b6f3-344d-11e9-a414-719c6709cf3e',
  },
] */

/*
 * Suomi:
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
 *
 * English:
 * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
 * However, for simplicity, we will store the author's name in connection with the book
 *
 * Spanish:
 * Podría tener más sentido asociar un libro con su autor almacenando la id del autor en el contexto del libro en lugar del nombre del autor
 * Sin embargo, por simplicidad, almacenaremos el nombre del autor en conección con el libro
 */

/*
let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: 'afa5b6f4-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring'],
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: 'afa5b6f5-344d-11e9-a414-719c6709cf3e',
    genres: ['agile', 'patterns', 'design'],
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: 'afa5de00-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring'],
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: 'afa5de01-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring', 'patterns'],
  },
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: 'afa5de02-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring', 'design'],
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: 'afa5de03-344d-11e9-a414-719c6709cf3e',
    genres: ['classic', 'crime'],
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: 'afa5de04-344d-11e9-a414-719c6709cf3e',
    genres: ['classic', 'revolution'],
  },
]
*/
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

  type Query {
    bookCount: Int
    authorCount: Int
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book

    editAuthor(name: String!, setBornTo: Int!): Author

    addAuthor(name: String!, born: Int): Author
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
  },

  Mutation: {
    addBook: async (root, args) => {
      console.log('args are', args)
      const existingAuthor = await Author.findOne({ name: args.author })
      console.log('existingAuthor is', existingAuthor)
      if (!existingAuthor) {
        console.log('adding author:', args.author)
        const newAuthor = new Author({ name: args.author })
        await newAuthor.save()
      }
      const author = await Author.findOne({ name: args.author })
      console.log('author after saving to db is', author)
      const newBook = new Book({
        ...args,
        author: author,
      })
      await newBook.save()
      return newBook
    },

    addAuthor: async (root, args) => {
      //console.log('args are', args)
      const newAuthor = new Author({
        ...args,
      })

      const existingAuthor = await Author.findOne({ name: args.name })
      if (existingAuthor) {
        return `Error: ${args.name} is already entered in the system.`
      }
      await newAuthor.save()
      //console.log('newAuthor after save is', newAuthor)
      return newAuthor
    },

    editAuthor: (root, args) => {
      //currently broken
      console.log('received mutation query:', args.name, args.setBornTo)
      const author = authors.find((a) => a.name === args.name)
      if (!author) {
        console.log('could not find author')
        return null
      }
      const updatedAuthor = {
        ...author,
        born: args.setBornTo,
      }

      authors = authors.map((a) => (a.name === args.name ? updatedAuthor : a))
      return updatedAuthor
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
