import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Display from './components/Display'
import { useSelector, useDispatch } from 'react-redux'
import { displayMessage, resetDisplay } from './reducers/notificationReducer'
import {
  blogsFromDb,
  addBlog,
  addLike,
  removeBlog,
} from './reducers/blogReducer'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [showBlogs, setShowBlogs] = useState(false)

  const dispatch = useDispatch()
  const messageState = useSelector((state) => state.notification)
  const blogState = useSelector((state) => state.blogs)

  const setDisplayMessage = (message, error = null) => {
    dispatch(displayMessage({ message, error }))
    setTimeout(() => {
      dispatch(resetDisplay())
    }, 5000)
  }

  const sortBlogs = (blogs) => {
    const blogsCopy = [...blogs]
    if (blogs.length > 1) {
      blogsCopy.sort((a, b) => b.likes - a.likes)
    }
    setBlogs(blogsCopy)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      window.localStorage.setItem('bloglistLoggedInUser', JSON.stringify(user))
      blogService.setToken(user.token)
    } catch (exception) {
      setDisplayMessage('Invalid Username or Password', true)
    }
    setUsername('')
    setPassword('')
  }

  const createBlog = async (blogObject) => {
    const tryAddBlog = await dispatch(addBlog(blogObject))
    console.log('res is', tryAddBlog)
    if (!tryAddBlog)
      setDisplayMessage(
        `A new blog: ${blogObject.title} by ${blogObject.author} was added.`
      )
    else {
      if (tryAddBlog.response.data.error) {
        setDisplayMessage(tryAddBlog.response.data.error, true)
      } else {
        setDisplayMessage(tryAddBlog.response.statusText, true)
      }
    }
    setShowBlogs(false)
  }

  const likeBlog = async (blogObject) => {
    try {
      dispatch(addLike(blogObject))
    } catch (exception) {
      if (exception.response.data.error) {
        setDisplayMessage(exception.response.data.error, true)
      } else {
        setDisplayMessage(exception.response.statusText, true)
      }
    }
  }

  const deleteBlog = async (blogObject) => {
    try {
      blogService.setToken(user.token)
      dispatch(removeBlog(blogObject.id))
    } catch (exception) {
      if (exception.response.data.error) {
        setDisplayMessage(exception.response.data.error, true)
      } else {
        setDisplayMessage(exception.response.statusText, true)
      }
    }
  }

  const logOut = () => {
    setUser(null)
    window.localStorage.removeItem('bloglistLoggedInUser')
  }

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('bloglistLoggedInUser')
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    dispatch(blogsFromDb())
  }, [dispatch])

  return (
    <div>
      {!user && (
        <LoginForm
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          handleSubmit={handleSubmit}
        />
      )}

      {messageState.message && (
        <div>
          <Display message={messageState.message} error={messageState.error} />
        </div>
      )}

      {user && (
        <div>
          <p>
            Logged in as {user.username}{' '}
            <button onClick={() => logOut()}>Log Out</button>
          </p>
          {showBlogs === false && (
            <button onClick={() => setShowBlogs(true)}> Add a Blog</button>
          )}
          <BlogForm createBlog={createBlog} visible={showBlogs} />
          {showBlogs && (
            <button onClick={() => setShowBlogs(false)}>Cancel</button>
          )}
          <h2>Blogs</h2>
          {blogState.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              likeBlog={likeBlog}
              deleteBlog={deleteBlog}
              user={user}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default App
