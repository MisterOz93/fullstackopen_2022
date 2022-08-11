import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import DisplayError from './components/DisplayError'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const loggedInUser = await loginService.login({ username, password })
      setUser(loggedInUser)
      blogService.setToken(loggedInUser.token)
    } catch (exception) {
        setErrorMessage('Invalid Username or Password')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
    }
    setUsername('')
    setPassword('')
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  return (
    <div>
      {!user && <LoginForm username={username} password={password} setUsername={setUsername}
        setPassword={setPassword} handleSubmit={handleSubmit} /> }

      {errorMessage && <DisplayError message={errorMessage}/>}

      {user && 
        <div>
          <p>Logged in as {user.username}</p>
          <h2>Blogs</h2>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      }
    </div>
  )
}

export default App
