import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Display from './components/Display'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)
  const [showBlogs, setShowBlogs] = useState(false)

  const removeMessage = () => {
    setTimeout(() => {
      setMessage(null)
      setError(null)
    }, 5000)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      window.localStorage.setItem('bloglistLoggedInUser', JSON.stringify(user))
      blogService.setToken(user.token)
    } catch (exception) {
        setError('Invalid Username or Password')
        removeMessage()
    }
    setUsername('')
    setPassword('')
  }

  const createBlog = async (blogObject) => {

    const blog = {
      title: blogObject.title,
      author: blogObject.author,
      url: blogObject.url
    }
    try{
      const newBlog = await blogService.create(blog)
      setBlogs(blogs.concat(newBlog))
      setMessage(`A new blog: ${newBlog.title} by ${newBlog.author} was added.`)
      removeMessage()
    } catch (exception) {
      setError(exception.response.data.error)
      removeMessage()
    }
    setShowBlogs(false)
  }

  const updateBlog = async (blogObject) => {
    try{
      const blogToUpdate = await blogService.getOne(blogObject)
      const updatedBlogObject = {
        user: blogToUpdate.user,
        likes: blogToUpdate.likes + 1,
        author: blogToUpdate.author,
        title: blogToUpdate.title,
        url: blogToUpdate.url
      }
      const updatedBlog = await blogService.update(blogToUpdate.id, updatedBlogObject)
      const updatedBlogs = blogs.map(blog => blog.id !== blogToUpdate.id ? blog : updatedBlog)
      setBlogs(updatedBlogs)
    
    } catch (exception) {
      setError(exception.response.data.error)
      removeMessage()
    }
  }

  const logOut = () => {
    setUser(null)
    window.localStorage.removeItem('bloglistLoggedInUser')
  }

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('bloglistLoggedInUser')
    if (loggedInUserJSON){
      const user = JSON.parse(loggedInUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  return (
    <div>
      {!user && <LoginForm username={username} password={password} setUsername={setUsername}
        setPassword={setPassword} handleSubmit={handleSubmit} /> }

      {message && <Display message={message} />}
      {error && <Display message={null} error={error} />}
      
      {user && 
        <div>
          <p>Logged in as {user.username} <button onClick={() => logOut()}>Log Out</button></p>
          {showBlogs === false && <button onClick={() => setShowBlogs(true)}> Create Blog</button>}
          <BlogForm createBlog={createBlog} visible={showBlogs}/>
          {showBlogs && <button onClick={() => setShowBlogs(false)}>Cancel</button>}
          <h2>Blogs</h2>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} updateBlog={updateBlog}/>
          )}
        </div>
      }
    </div>
  )
}

export default App
