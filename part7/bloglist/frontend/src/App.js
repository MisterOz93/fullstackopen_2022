import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Display from './components/Display'
import Users from './components/Users'
import SingleUser from './components/SingleUser'
import BlogList from './components/BlogList'
import BlogInfo from './components/BlogInfo'
import { useSelector, useDispatch } from 'react-redux'
import { displayMessage, resetDisplay } from './reducers/notificationReducer'
import {
  blogsFromDb,
  addBlog,
  addLike,
  removeBlog,
} from './reducers/blogReducer'

import { Navbar, Nav } from 'react-bootstrap'

import { navLinkStyle, navUsername } from './styles/navbarStyles'

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
    <div className="container">
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
            <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link href="#" as="span">
                    <Link to="/" style={navLinkStyle}>
                      Blogs
                    </Link>
                  </Nav.Link>
                  <Nav.Link href="#" as="span">
                    <Link to="/users" style={navLinkStyle}>
                      Users
                    </Link>
                  </Nav.Link>
                </Nav>
                <Nav>
                  <Nav.Link href="#" as="span">
                    <span style={navUsername}> {userState.username} </span>{' '}
                    logged in
                  </Nav.Link>
                  <Nav.Link href="#" as="span">
                    <button onClick={() => logOut()}>Log Out</button>
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Navbar>

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
              <Route
                path="/users/:id"
                element={<SingleUser blogs={blogState} />}
              />
              <Route
                path="/blogs/:id"
                element={<BlogInfo likeBlog={likeBlog} blogs={blogState} />}
              />
            </Routes>
          </Router>
        </div>
      )}
    </div>
  )
}

export default App
