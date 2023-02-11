import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const RecommendedBooks = ({ genre, show }) => {
  const recommendedBooks = useQuery(ALL_BOOKS, {
    variables: { genre },
    skip: !genre,
  })

  if (!show || !genre) {
    return null
  }

  if (recommendedBooks.loading) {
    return <h2>Loading...</h2>
  }
  if (recommendedBooks.data.allBooks) {
    const booksInGenre = recommendedBooks.data.allBooks
    return (
      <div>
        <h2>Recommended Books</h2>
        <h4>
          Books in your favorite genre <em>{genre}</em>
        </h4>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>Author</th>
              <th>Published</th>
            </tr>
            {booksInGenre.map((b) => (
              <tr key={b.title}>
                <td>{b.title}</td>
                <td>{b.author.name}</td>
                <td>{b.published}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}

export default RecommendedBooks
