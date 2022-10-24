import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'

const LoginForm = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [login, result] = useMutation(LOGIN)

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      props.setToken(token)
      localStorage.setItem('library-user-token', token)
      props.setPage('authors')
    }
    // eslint-disable-next-line
  }, [result.data])

  if (!props.show) {
    return null
  }
  const submit = (event) => {
    event.preventDefault()
    login({
      variables: { username, password },
    })
    setUsername('')
    setPassword('')
  }
  return (
    <div>
      <h2>Log In</h2>
      <form onSubmit={submit}>
        Username:{' '}
        <input
          value={username}
          onChange={({ target }) => {
            setUsername(target.value)
          }}
        />
        <div style={{ marginTop: 10 }}>
          Password:{' '}
          <input
            type='password'
            value={password}
            onChange={({ target }) => {
              setPassword(target.value)
            }}
          />
        </div>
        <button style={{ marginTop: 10 }} type='submit'>
          Log In
        </button>
      </form>
    </div>
  )
}

export default LoginForm
