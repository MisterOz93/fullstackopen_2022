import { useState } from "react"

const Blog = ({ blog, updateBlog }) => {
  const [showDetails, setShowDetails] = useState(false)
  const buttonText = showDetails ? 'Hide' : 'View'
  
  const toggleView = () => {
    setShowDetails(!showDetails)
  }

  const addLike = () => {
    updateBlog(blog)
  }

  const blogStyle = {
    'border': '1px solid black',
    'margin': '2%',
    'paddingLeft': '2%',

  }

  return(
    <div style={blogStyle}>
      <p>{blog.title} by {blog.author} <button onClick={toggleView}> {buttonText} </button> </p>
      {showDetails && 
      <>
        <p>{blog.url}</p>
        <p>Likes: {blog.likes} <button onClick={addLike}>Like</button></p>
        <p>{blog.user.username}</p>
      </>}
    </div>
  )
}

export default Blog