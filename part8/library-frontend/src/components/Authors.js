import { useQuery } from '@apollo/client'
import { ALL_AUTHORS } from '../queries'

const Authors = (props) => {
  const getAuthors = useQuery(ALL_AUTHORS)

  if (getAuthors.loading) {
    return <div>Loading...</div>
  }
  const authors = getAuthors.data.allAuthors

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Authors
