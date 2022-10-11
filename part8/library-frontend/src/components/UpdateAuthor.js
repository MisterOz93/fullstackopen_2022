import { useState } from 'react'

const UpdateAuthor = () => {
  const [name, setName] = useState('')
  const [year, setYear] = useState('')
  const updateAuthor = (event) => {
    event.preventDefault()
    //
    setName('')
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
