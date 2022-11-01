import { useApolloClient, useQuery, useSubscription } from '@apollo/client'
import { useState } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'
import { ALL_PERSONS, PERSON_ADDED } from './queries'
import PhoneForm from './components/PhoneForm'
import LoginForm from './components/LoginForm'

export const updateCache = (cache, query, addedPerson) => {
  const uniqueByName = (arr) => {
    let seen = new Set()
    return arr.filter((i) => {
      return seen.has(i.name) ? false : seen.add(i.name)
    })
  }

  cache.updateQuery(query, ({ allPersons }) => {
    return {
      allPersons: uniqueByName(allPersons.concat(addedPerson)),
    }
  })
}

const App = () => {
  const result = useQuery(ALL_PERSONS)
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const client = useApolloClient()

  useSubscription(PERSON_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedPerson = subscriptionData.data.personAdded
      notify(`${addedPerson.name} added`)
      updateCache(client.cache, { query: ALL_PERSONS }, addedPerson)
    },
  })

  if (result.loading) {
    return <div>loading...</div>
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 6000)
  }

  if (!token) {
    return (
      <div>
        <Notification errorMessage={errorMessage} />
        <h2>Log In</h2>
        <LoginForm setToken={setToken} setError={notify} />
      </div>
    )
  }

  return (
    <div>
      <Notification errorMessage={errorMessage} />
      <button onClick={logout}> Log Out </button>
      <Persons persons={result.data.allPersons} />
      <PersonForm setError={notify} />
      <PhoneForm setError={notify} />
    </div>
  )
}

export default App
