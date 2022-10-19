//continue from loginform code overview

import { useQuery } from '@apollo/client'
import { useState } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'
import { ALL_PERSONS } from './queries'
import PhoneForm from './components/PhoneForm'
import LoginForm from './components/LoginForm'

const App = () => {
  const result = useQuery(ALL_PERSONS)
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  if (result.loading) {
    return <div>loading...</div>
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
      <Persons persons={result.data.allPersons} />
      <PersonForm setError={notify} />
      <PhoneForm setError={notify} />
    </div>
  )
}

export default App
