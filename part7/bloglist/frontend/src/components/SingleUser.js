import { useParams } from 'react-router'

const SingleUser = ({ blogs }) => {
  const userId = useParams().id
  const user = blogs.map((blog) => blog.user).find((user) => user.id === userId)
  if (!user) {
    return null
  }
  const blogsByUser = blogs.filter((blog) => blog.user.id === user.id)
  return (
    <div>
      <h2>{user.username}</h2>
      <h3>Added Blogs: </h3>
      <ul>
        {blogsByUser.map((blog) => {
          return <li key={blog.id}>{blog.title}</li>
        })}
      </ul>
    </div>
  )
}

export default SingleUser
