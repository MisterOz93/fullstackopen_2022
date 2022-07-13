import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [query, setQuery] = useState('')
  const [showAllPersons, setShowAllPersons] = useState(true)

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber
    }
    if (persons.map(person => person.name.trim().toLowerCase())
    .includes(newPerson.name.trim().toLowerCase())){
      alert(`${newName} is already in the phonebook!`)
    }
    else {
      setPersons(persons.concat(newPerson))
    }
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    let filtered = event.target.value.split('').filter(d => !isNaN(d) || d === '-' || d === ' ')
    if (event.target.value.length !== filtered.join('').length){
      return
    }
    setNewNumber(event.target.value)
  }

  const handleQueryChange = (event) => {
    setQuery(event.target.value)
    if (event.target.value){
      setShowAllPersons(false)
    }
    else {
      setShowAllPersons(true)
    }
  }

  const personsToShow = showAllPersons ? persons 
    : persons.filter(person => person.name.toLowerCase().includes(query.toLowerCase().trim()))

  return (
    <div>
      <h2>Phonebook</h2>
        Show only names containing: <input value={query} onChange={handleQueryChange} />
      <form onSubmit={addPerson}>
        <div>
          name: <input required value={newName} onChange={handleNameChange}/>
        </div>
        <div>
        number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {personsToShow.map(person => {
        return(
          <p key={person.name}>{person.name} {person.number}</p>
        )
      })
      }
    </div>
  )
}

export default App