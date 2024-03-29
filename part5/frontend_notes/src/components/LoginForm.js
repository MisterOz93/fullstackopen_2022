const LoginForm = ({ username, setUsername, password, setPassword, handleLogin }) => {
  return(
    <form onSubmit={handleLogin}>
      <div>
      Username:
        <input
          type='text'
          id='username-field'
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
      Password:
        <input
          type="password"
          id='password-field'
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type='submit' id='login-submit'>Login</button>
    </form>
  )
}

export default LoginForm