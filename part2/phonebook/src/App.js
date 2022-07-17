import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personsBackend from './backend_communication/persons'

const App = () => {

  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [query, setQuery] = useState('')
  const [showAllPersons, setShowAllPersons] = useState(true)

  useEffect(() => {
    personsBackend.getAll()
      .then(res => {
        setPersons(res)
      })
  }, [])

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
      personsBackend.create(newPerson).then(res =>{
        setPersons(persons.concat(res))
      })
    }
    setNewName('')
    setNewNumber('')
  }

  const deletePerson = (person) => {
    if (window.confirm(`Are you sure you want to delete ${person.name} from the phonebook?`)){
      personsBackend.deletePerson(person).then(res => {
        personsBackend.getAll().then(res => setPersons(res))
      })
    }
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
      <Persons persons={personsToShow} deletePerson={deletePerson}/>
    </div>
  )
}

export default App