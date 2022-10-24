import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)

  const logout = () => {
    setToken(null)
    localStorage.removeItem('library-user-token')
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
      <LoginForm
        show={page === 'login'}
        setPage={setPage}
        setToken={setToken}
      />
    </div>
  )
}

export default App
