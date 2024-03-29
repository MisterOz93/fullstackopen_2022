import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`

export const ALL_BOOKS = gql`
  query AllBooks($genre: String) {
    allBooks(genre: $genre) {
      title
      published
      genres
      author {
        name
        id
        born
        bookCount
      }
    }
  }
`
export const ADD_BOOK = gql`
  mutation createBook(
    $title: String!
    $published: Int
    $author: String!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      published: $published
      author: $author
      genres: $genres
    ) {
      title
      published
      author {
        name
      }
      genres
      id
    }
  }
`
export const EDIT_AUTHOR = gql`
  mutation editAuthorBirthYear($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
      bookCount
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`
export const CURRENT_USER = gql`
  query {
    me {
      username
      favouriteGenre
      id
    }
  }
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      title
      published
      genres
      author {
        name
        id
        born
        bookCount
      }
    }
  }
`
