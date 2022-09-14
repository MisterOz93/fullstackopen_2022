import ReactDOM  from 'react-dom/client'

import { Table, Form, Button, Navbar, Nav, Alert } from 'react-bootstrap'

import { TableContainer, Table as MuiTable, Paper, TableBody, TableRow,
TableCell, Button as MuiButton, TextField, Alert as MuiAlert, AppBar,
Toolbar
  } from '@mui/material'

import { useState } from 'react'

import { Container } from '@mui/material'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useParams,
  useNavigate,
  useMatch,
} from "react-router-dom"

import styled from 'styled-components'

const StyledButton = styled.button`
  background: Bisque;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: solid 2px Chocolate;
  border-radius: 3px;
  `

const StyledInput = styled.input`
  margin: 0.25em;
  `



const Home = () => (
  <div>
    <h2>TKTL notes app</h2>
    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
  </div>
)

const Note = ({ note }) => {

  return (
    <div>
      <h2>{note.content}</h2>
      <div>{note.user}</div>
      <div><strong>{note.important ? 'important' : ''}</strong></div>
    </div>
  )
}

const Notes = ({ notes }) => (
  <div>
    <h2>Notes</h2>
    <TableContainer component={Paper}>
      <MuiTable>
        <TableBody>
          {notes.map(note =>
            <TableRow key={note.id}>
              <TableCell>
                <Link to={`/notes/${note.id}`}>{note.content}</Link>
              </TableCell>
              <TableCell>
                {note.user}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </MuiTable>
    </TableContainer>
  </div>
)

const Users = () => (
  <div>
    <h2>TKTL notes app</h2>
    <ul>
      <li>Matti Luukkainen</li>
      <li>Juha Tauriainen</li>
      <li>Arto Hellas</li>
    </ul>
  </div>
)

const Login = (props) => {
  const navigate = useNavigate()

  const onSubmit = (event) => {
    event.preventDefault()
    props.onLogin('mluukkai')
    navigate('/')
  }

  return (
    <div>
      <h2>login</h2>
      <form onSubmit={onSubmit}>
        <div>
            username:
            <StyledInput />
        </div>
        <div>
            password:
            <StyledInput type='password' />
        </div>
        <div>
          <StyledButton type='submit' primary=''>login</StyledButton>
        </div>
      </form>
    </div>
  )
}

const App = () => {
  const [notes, setNotes] = useState([
    {
      id: 1,
      content: 'HTML is easy',
      important: true,
      user: 'Matti Luukkainen'
    },
    {
      id: 2,
      content: 'Browser can execute only JavaScript',
      important: false,
      user: 'Matti Luukkainen'
    },
    {
      id: 3,
      content: 'Most important methods of HTTP-protocol are GET and POST',
      important: true,
      user: 'Arto Hellas'
    }
  ])

  const [user, setUser] = useState(null)

  const [message, setMessage] = useState(null)

  const match = useMatch('/notes/:id')

  const note = match 
    ? notes.find(note => note.id === Number(match.params.id))
    : null

  const login = (user) => {
    setUser(user)
    setMessage(`Welcome ${user}`)
    setTimeout(() => {
      setMessage(null)
    }, 10000)
  }

  const padding = {
    padding: 5
  }

  return (
    <Container>
      <AppBar position='static'>
        <Toolbar>
          <MuiButton color='inherit' component={Link} to='/'>
            Home
          </MuiButton>
          <MuiButton color='inherit' component={Link} to='/notes'>
            Notes
          </MuiButton>
          <MuiButton color='inherit' component={Link} to='/users'>
            Users
          </MuiButton>
          {user 
            ? <em> {user} logged in </em>
            : <MuiButton color='inherit' component={Link} to='/login'>
                Login
              </MuiButton>
            }
        </Toolbar>
      </AppBar>
      <div className='message_container'>
        {(message && 
          <MuiAlert severity='success'>
            {message}
          </MuiAlert>
         )}
      </div>
      <Routes>
        <Route path="/notes/:id" element={<Note notes={note} />} />
        <Route path="/notes" element={<Notes notes={notes} />} />
        <Route path="/users" element={user ? <Users /> : <Navigate replace to="/login" />} />          <Route path="/login" element={<Login onLogin={login} />} />
        <Route path="/" element={<Home />} />
      </Routes>
      <div>
        <br />
        <em>Note app, Department of Computer Science 2022</em>
      </div>
    </Container>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <App />
  </Router>
)