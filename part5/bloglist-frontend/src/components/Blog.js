import { useState } from "react"

const Blog = ({blog}) => {
  const [showDetails, setShowDetails] = useState(false)
  const buttonText = showDetails ? 'Hide' : 'View'
  
  const clickHandler = () => {
    setShowDetails(!showDetails)
  }

  const blogStyle = {
    'border': '1px solid black',
    'margin': '2%',
    'paddingLeft': '2%',

  }

  return(
    <div style={blogStyle}>
      <p>{blog.title} by {blog.author} <button onClick={clickHandler}> {buttonText} </button> </p>
      {showDetails && 
      <>
        <p>{blog.url}</p>
        <p>Likes: {blog.likes} <button>Like</button></p>
        <p>{blog.user.username}</p>
      </>}
    </div>
  )
}

export default Blog