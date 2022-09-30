import { Link } from 'react-router-dom'

const Users = ({ blogs }) => {
  const blogsByUser = {}
  for (let i = 0; i < blogs.length; i++) {
    blogsByUser[blogs[i].user.username]
      ? (blogsByUser[blogs[i].user.username] += 1)
      : (blogsByUser[blogs[i].user.username] = 1)
  }
  const users = blogs.map((blog) => blog.user)

  console.log('blogs on Users.js render:', blogs)

  if (!users) {
    return null
  }

  const findUserId = (username) => {
    const user = users.find((user) => user.username === username)
    if (!user) {
      return
    }
    return user.id
  }

  return (
    <div>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr>
            <td> </td>
            <td>
              <strong>Blogs Created</strong>
            </td>
          </tr>
          {Object.entries(blogsByUser).map((kvPair) => {
            return (
              <tr key={kvPair[0]}>
                <td>
                  {
                    <Link to={`/users/${findUserId(kvPair[0])}`}>
                      {' '}
                      {kvPair[0]}{' '}
                    </Link>
                  }
                </td>

                <td>{kvPair[1]}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Users
