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
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

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

  const createBlog = async (event) => {
    event.preventDefault()

    const blog = {
      title, author, url
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
          <BlogForm url={url} setUrl={setUrl} author={author} setAuthor={setAuthor}
            title={title} setTitle={setTitle} createBlog={createBlog} />
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
