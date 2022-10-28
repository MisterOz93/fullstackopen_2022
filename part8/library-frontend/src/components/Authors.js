import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR, ALL_BOOKS } from '../queries'
import UpdateAuthor from './UpdateAuthor'

const Authors = (props) => {
  const getAuthors = useQuery(ALL_AUTHORS)
  const getBooks = useQuery(ALL_BOOKS, {
    variables: { genre: null },
  })
  //getBooks temporary until bookCount field of Author obj is fixed

  const [editAuthorBirthYear] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })

  if (getAuthors.loading || getBooks.loading) {
    return <div>Loading...</div>
  }

  const authors = getAuthors.data.allAuthors
  const books = getBooks.data.allBooks

  const bookCount = {}

  books.map((b) => {
    bookCount[b.author.name] = bookCount[b.author.name]
      ? bookCount[b.author.name] + 1
      : 1
  })

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>Authors</h2>
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
              <td>{bookCount[a.name]}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <UpdateAuthor
        authors={authors.map((a) => a.name)}
        editAuthorBirthYear={editAuthorBirthYear}
      />
    </div>
  )
}

export default Authors
