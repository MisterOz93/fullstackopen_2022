import { useParams } from 'react-router-dom'
import Comments from './Comments'

const BlogInfo = ({ likeBlog, blogs }) => {
  const blogId = useParams().id
  const blog = blogs.find((blog) => blog.id === blogId)
  if (!blog) {
    return null
  }
  const addLike = () => {
    likeBlog(blog)
  }

  const likeOrLikes = blog.likes !== 1 ? 'likes' : 'like'
  return (
    <div>
      <h2>
        {blog.title} {blog.author}
      </h2>
      <a href="#">{blog.url}</a>
      <p>
        {blog.likes} {likeOrLikes} <button onClick={addLike}>Like</button>
      </p>
      <p>Added by {blog.user.username}</p>
      <Comments blog={blog} />
    </div>
  )
}

export default BlogInfo
