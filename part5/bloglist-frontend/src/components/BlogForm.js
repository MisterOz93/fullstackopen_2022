//cont. by checking if still works after moving state into this file
import { useState } from "react"

const BlogForm = ({ createBlog, visible }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title, author, url
    })

    setTitle('')
    setAuthor('')
    setUrl('')

  }
  
  if (!visible){
    return
  }
  return(
    <form onSubmit={addBlog}>
      <h3>Create New Blog</h3>
      <p>Title: <input type='text' value={title} onChange={({ target }) => setTitle(target.value)} /> </p>
      <p>Author:<input type='text' value={author} onChange={({ target }) => setAuthor(target.value)} /> </p>
      <p>URL:<input type='text' value={url} onChange={({ target }) => setUrl(target.value)} /> </p>
      <button type='submit'>Create Blog</button>
    </form>
  )
}

export default BlogForm