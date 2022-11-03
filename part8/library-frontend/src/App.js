import { useEffect, useState } from 'react'
import { ALL_BOOKS, CURRENT_USER, BOOK_ADDED } from './queries'
import { useApolloClient, useQuery, useSubscription } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import RecommendedBooks from './components/RecommendedBooks'

const App = () => {
  const [page, setPage] = useState('authors')
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)

  const client = useApolloClient()

  const currentUser = useQuery(CURRENT_USER)

  if (!token && localStorage.getItem('library-user-token')) {
    setToken(localStorage.getItem('library-user-token'))
  }

  useEffect(() => {
    if (currentUser.data) {
      setUser(currentUser.data.me)
    }
  }, [currentUser.data])

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      //console.log('subscriptionData is', subscriptionData)
      const bookAdded = subscriptionData.data.bookAdded
      bookAdded.author.bookCount = bookAdded.author.bookCount + 1
      window.alert(`${bookAdded.title} has been added to the list of books`)
      client.cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
        return {
          allBooks: allBooks.concat(bookAdded),
        }
      })
    },
  })

  //debug helper: console.log('curr user', user, 'token is:', token)

  const logout = () => {
    setToken(null)
    setUser(null)
    localStorage.clear()
    client.resetStore()

    setPage('authors')
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>Authors</button>
        <button onClick={() => setPage('books')}>Books</button>
        {localStorage.getItem('library-user-token') && (
          <>
            <button onClick={() => setPage('add')}>Add Book</button>
            <button onClick={() => setPage('recommended')}>
              Recommendations
            </button>
            <button onClick={() => logout()}>Log Out</button>
          </>
        )}
        {!localStorage.getItem('library-user-token') && (
          <button onClick={() => setPage('login')}>Log In</button>
        )}
      </div>

      <Authors show={page === 'authors'} />

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} />
      {user && (
        <RecommendedBooks
          show={page === 'recommended'}
          genre={user.favouriteGenre}
        />
      )}
      <LoginForm
        show={page === 'login'}
        setPage={setPage}
        setToken={setToken}
        setUser={setUser}
      />
    </div>
  )
}

export default App
