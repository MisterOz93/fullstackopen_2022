import BlogForm from './BlogForm'
import Blog from './Blog'

const BlogList = ({ props }) => {
  if (!props.blogState) {
    return <>Loading Blogs...</>
  }
  return (
    <div>
      {props.showBlogs === false && (
        <button onClick={() => props.setShowBlogs(true)}> Add a Blog</button>
      )}
      <BlogForm createBlog={props.createBlog} visible={props.showBlogs} />
      {props.showBlogs && (
        <button onClick={() => props.setShowBlogs(false)}>Cancel</button>
      )}
      <h2>Blogs</h2>
      {props.blogState.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          likeBlog={props.likeBlog}
          deleteBlog={props.deleteBlog}
          user={props.userState}
        />
      ))}
    </div>
  )
}

export default BlogList
