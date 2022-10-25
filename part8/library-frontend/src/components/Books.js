import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import { useState } from 'react'

const Books = (props) => {
  const getBooks = useQuery(ALL_BOOKS)
  const [currentGenre, setCurrentGenre] = useState('All Genres')
  const [genres, setGenres] = useState([])

  if (!props.show) {
    return null
  }
  if (getBooks.loading) {
    return <h2>loading...</h2>
  }
  if (getBooks.data) {
    const books = getBooks.data.allBooks

    books
      .map((b) => b.genres)
      .map((list) =>
        list.forEach((genre) => {
          if (!genres.includes(genre)) {
            setGenres(genres.concat(genre))
          }
        })
      )

    return (
      <div>
        <h2>Books</h2>
        <p>Showing books in: {currentGenre} </p>

        <table>
          <tbody>
            <tr>
              <th></th>
              <th>Author</th>
              <th>published</th>
            </tr>
            {books.map((b) => {
              if (
                currentGenre === 'All Genres' ||
                b.genres.includes(currentGenre)
              ) {
                return (
                  <tr key={b.title}>
                    <td>{b.title}</td>
                    <td>{b.author.name}</td>
                    <td>{b.published}</td>
                  </tr>
                )
              }
            })}
          </tbody>
        </table>
        <div style={{ marginTop: 10 }}>
          {genres.map((genre) => {
            return (
              <button
                style={{ margin: 2 }}
                key={genre}
                onClick={() => setCurrentGenre(genre)}
              >
                {genre}
              </button>
            )
          })}
          <button
            style={{ margin: 2 }}
            onClick={() => setCurrentGenre('All Genres')}
          >
            All Genres
          </button>
        </div>
      </div>
    )
  }
}

export default Books
