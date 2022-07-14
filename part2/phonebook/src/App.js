import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    //{ name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
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
        <Filter query={query} handleQueryChange={handleQueryChange}/>
        <h3>Add a new: </h3>
        <PersonForm onSubmit={addPerson} name={newName} number={newNumber}
        nameChange={handleNameChange} numberChange={handleNumberChange} />
      <h3>Numbers</h3>
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