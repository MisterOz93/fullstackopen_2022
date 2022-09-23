//create a seperate view for blogs and users, blogs at / and
//users at /users
import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Display from './components/Display'
import Users from './components/Users'
import BlogList from './components/BlogList'
import { useSelector, useDispatch } from 'react-redux'
import { displayMessage, resetDisplay } from './reducers/notificationReducer'
import {
  blogsFromDb,
  addBlog,
  addLike,
  removeBlog,
} from './reducers/blogReducer'

import { setCurrentUser } from './reducers/userReducer'

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showBlogs, setShowBlogs] = useState(false)

  const dispatch = useDispatch()
  const messageState = useSelector((state) => state.notification)
  const blogState = useSelector((state) => state.blogs)
  const userState = useSelector((state) => state.user)

  const setDisplayMessage = (message, error = null) => {
    dispatch(displayMessage({ message, error }))
    setTimeout(() => {
      dispatch(resetDisplay())
    }, 5000)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('bloglistLoggedInUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setCurrentUser(user))
    } catch (exception) {
      setDisplayMessage('Invalid Username or Password', true)
    }
    setUsername('')
    setPassword('')
  }

  const createBlog = async (blogObject) => {
    const tryAddBlog = await dispatch(addBlog(blogObject))
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
      blogService.setToken(userState.token)
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
    dispatch(setCurrentUser(null))
    window.localStorage.removeItem('bloglistLoggedInUser')
  }

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('bloglistLoggedInUser')
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      dispatch(setCurrentUser(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])

  useEffect(() => {
    dispatch(blogsFromDb())
  }, [dispatch])

  return (
    <div>
      {!userState && (
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

      {userState && (
        <div>
          <Router>
            <div>
              <Link to="/">Blogs</Link>
              {'  '}
              <Link to="/users">Users</Link>
            </div>
            <p>
              Logged in as {userState.username}{' '}
              <button onClick={() => logOut()}>Log Out</button>
            </p>

            <Routes>
              <Route path="/users" element={<Users blogs={blogState} />} />
              <Route
                path="/"
                element={
                  <BlogList
                    props={{
                      showBlogs,
                      setShowBlogs,
                      blogState,
                      likeBlog,
                      userState,
                      createBlog,
                      deleteBlog,
                    }}
                  />
                }
              />
            </Routes>
          </Router>
        </div>
      )}
    </div>
  )
}

export default App
