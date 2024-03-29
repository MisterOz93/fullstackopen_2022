import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, likeBlog, deleteBlog, user }) => {
  const [showDetails, setShowDetails] = useState(false)
  const buttonText = showDetails ? 'Hide' : 'View'

  const toggleView = () => {
    setShowDetails(!showDetails)
  }

  const addLike = () => {
    likeBlog(blog)
  }

  const confirmDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author} ?`)) {
      deleteBlog(blog)
    }
  }

  const blogStyle = {
    border: '1px solid black',
    margin: '2%',
    paddingLeft: '2%',
    backgroundColor: 'lightGrey',
  }

  const deleteButtonStyle = {
    backgroundColor: 'lightBlue',
    border: ' 2px',
    borderRadius: '10%',
    marginBottom: '2%',
    padding: '1.5%',
  }

  const viewButtonStyle = {
    justifySelf: 'end',
  }

  return (
    <div className="blog" style={blogStyle}>
      <p>
        {blog.title} by {blog.author}{' '}
        <button style={viewButtonStyle} onClick={toggleView}>
          {' '}
          {buttonText}{' '}
        </button>{' '}
      </p>
      {showDetails && (
        <>
          <p>{blog.url}</p>
          <p>
            Likes: {blog.likes}{' '}
            <button id="like_button" onClick={addLike}>
              Like
            </button>
          </p>
          <p>{blog.user.username}</p>
          {user.username === blog.user.username &&
            user.name === blog.user.name && (
              <button style={deleteButtonStyle} onClick={confirmDelete}>
                Delete
              </button>
            )}
        </>
      )}
    </div>
  )
}

Blog.propTypes = {
  likeBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
}

export default Blog
