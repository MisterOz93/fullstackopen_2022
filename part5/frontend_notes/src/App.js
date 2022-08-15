//cont. with exercise 5.1
import { useState, useEffect, useRef } from 'react'
//import axios from 'axios'
import Note from './components/Note'
import noteService from './services/notes'
import Notification from './components/Notification'
import Footer from './components/Footer'
import LoginForm from './components/LoginForm'
import NoteForm from './components/NoteForm'
import loginService from './services/login'
import Toggleable from './components/Toggleable'

const App = () => {
  const [notes, setNotes] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const noteFormRef = useRef()

  useEffect(() => {
    const loginUserJSON = window.localStorage.getItem('loggedInNoteAppUser')
    if (loginUserJSON){
      const user = JSON.parse(loginUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    //console.log('effect')
    noteService.getAll().then(notes => setNotes(notes))
  }, [])

  //console.log('render', notes.length, 'notes');

  const notesToShow = showAll ? notes : notes.filter(note => note.important)

  const createNote = (noteObject) => {
    noteFormRef.current.toggleVisibility()
    noteService.create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
      })
  }

  const toggleImportance = (id) => {

    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }
    noteService.update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(() => {
        setErrorMessage(`The note ${note.content} was already deleted from the server `)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter(note => note.id !== id))
      })
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedInNoteAppUser', JSON.stringify(user))
      setUser(user)
      noteService.setToken(user.token)
      console.log('logging in with', user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Invalid Username or Password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }

  }

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      { !user ?
        <Toggleable buttonLabel='login'>
          <LoginForm handleLogin={handleLogin} setPassword={setPassword} password={password}
            setUsername={setUsername} username={username} />
        </Toggleable>
        :
        <div>
          <p> Logged in as {user.name}</p>
          <Toggleable buttonLabel='Add Note' ref={noteFormRef}>
            <NoteForm createNote={createNote} />
          </Toggleable>
        </div>
      }

      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important notes' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note =>
          <Note key={note.id} note={note} toggleImportance={() => toggleImportance(note.id)}/>
        )}
      </ul>
      <Footer />
    </div>
  )
}

export default App