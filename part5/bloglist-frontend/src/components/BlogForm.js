const BlogForm = ({ createBlog, title, setTitle, author, setAuthor, url, setUrl }) => {
  return(
    <form onSubmit={createBlog}>
      <h3>Create New Blog</h3>
      <p>Title: <input type='text' value={title} onChange={({ target }) => setTitle(target.value)} /> </p>
      <p>Author:<input type='text' value={author} onChange={({ target }) => setAuthor(target.value)} /> </p>
      <p>URL:<input type='text' value={url} onChange={({ target }) => setUrl(target.value)} /> </p>
      <button type='submit'>Create Blog</button>

    </form>
  )
}

export default BlogForm