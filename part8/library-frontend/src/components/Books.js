import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import { useState } from 'react'

const Books = (props) => {
  const [currentGenre, setCurrentGenre] = useState(null)
  const [genres, setGenres] = useState([])

  const { loading, data, refetch } = useQuery(ALL_BOOKS, {
    variables: { genre: currentGenre },
  })

  if (!props.show) {
    return null
  }
  if (loading) {
    return <h2>loading...</h2>
  }
  if (data) {
    const books = data.allBooks
    books
      .map((b) => b.genres)
      .map((list) =>
        list.forEach((genre) => {
          if (!genres.includes(genre)) {
            setGenres(genres.concat(genre))
          }
        })
      )

    const refetchBooks = (genre = null) => {
      setCurrentGenre(genre)
      refetch({ genre })
    }

    return (
      <div>
        <h2>Books</h2>
        <p>
          Showing books in: {currentGenre ? `${currentGenre}` : 'All Genres'}{' '}
        </p>

        <table>
          <tbody>
            <tr>
              <th></th>
              <th>Author</th>
              <th>published</th>
            </tr>
            {books.map((b) => {
              return (
                <tr key={b.title}>
                  <td>{b.title}</td>
                  <td>{b.author.name}</td>
                  <td>{b.published}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <div style={{ marginTop: 10 }}>
          {genres.map((genre) => {
            return (
              <button
                style={{ margin: 2 }}
                key={genre}
                onClick={() => refetchBooks(genre)}
              >
                {genre}
              </button>
            )
          })}
          <button style={{ margin: 2 }} onClick={() => refetchBooks()}>
            All Genres
          </button>
        </div>
      </div>
    )
  }
}

export default Books
