import { useEffect, useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR, ALL_BOOKS } from '../queries'
import UpdateAuthor from './UpdateAuthor'

const Authors = (props) => {
  const getAuthors = useQuery(ALL_AUTHORS)

  const [editAuthorBirthYear] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })

  if (getAuthors.loading) {
    return <div>Loading...</div>
  }

  const authors = getAuthors.data.allAuthors

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
              <td>{a.bookCount}</td>
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
