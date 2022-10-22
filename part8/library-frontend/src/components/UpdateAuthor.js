import { useState } from 'react'
import Select from 'react-select'

const UpdateAuthor = ({ authors, editAuthorBirthYear }) => {
  const [name, setName] = useState('')
  const [year, setYear] = useState('')

  const handleChange = (option) => {
    setName(option.value)
  }

  const options = authors.map((a) => ({ value: a, label: a }))

  const updateAuthor = (event) => {
    event.preventDefault()
    editAuthorBirthYear({
      variables: { name, setBornTo: +year },
    })
    setName('')
    setYear('')
  }
  return (
    <div>
      <h2>Set Birthyear</h2>
      <form onSubmit={updateAuthor}>
        <Select
          placeholder='Select Author'
          options={options}
          onChange={handleChange}
        />
        <div style={{ marginTop: 15, marginBottom: 15 }}>
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
        </div>
        <button type='submit'>Update Author</button>
      </form>
    </div>
  )
}

export default UpdateAuthor
