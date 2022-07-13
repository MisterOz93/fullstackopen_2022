import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName
    }
    if (persons.map(person => person.name.trim().toLowerCase())
    .includes(newPerson.name.trim().toLowerCase())){
      alert(`${newName} is already in the phonebook!`)
    }
    else {
      setPersons(persons.concat(newPerson))
    }
    setNewName('')
  }

  const handleChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => {
        return(
          <p key={person.name}>{person.name}</p>
        )
      })
      }
    </div>
  )
}

export default App