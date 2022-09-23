const Users = ({ blogs }) => {
  const blogsByUser = {}
  for (let i = 0; i < blogs.length; i++) {
    blogsByUser[blogs[i].user.username]
      ? (blogsByUser[blogs[i].user.username] += 1)
      : (blogsByUser[blogs[i].user.username] = 1)
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
              <tr>
                <td>{kvPair[0]}</td>

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
