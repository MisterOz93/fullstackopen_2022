import { useMutation } from '@apollo/client'
import { useState } from 'react'
import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries'

const UpdateAuthor = () => {
  const [name, setName] = useState('')
  const [year, setYear] = useState('')
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })
  const updateAuthor = (event) => {
    event.preventDefault()
    editAuthor({
      variables: { name, setBornTo: +year },
    })
    setName('')
    setYear('')
  }
  return (
    <div>
      <h2>Set Birthyear</h2>
      <form onSubmit={updateAuthor}>
        <div>
          Name:{' '}
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        Born:{' '}
        <input
          pattern='[0-9]*'
          value={year}
          onChange={({ target }) => {
            target.validity.valid && target.value.length < 5
              ? setYear(target.value)
              : setYear(year)
          }}
        />
        <button type='submit'>Update Author</button>
      </form>
    </div>
  )
}

export default UpdateAuthor
