//cont. with taking notes in frontend login txt file
import { useState, useEffect } from 'react'
//import axios from 'axios'
import Note from './components/Note'
import noteService from './services/notes'
import Notification from './components/Notification'
import Footer from './components/Footer'
import LoginForm from './components/LoginForm'
import NoteForm from './components/NoteForm'
import loginService from './services/login'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    //console.log('effect')
    noteService.getAll().then(notes => setNotes(notes))
  }, [])

  //console.log('render', notes.length, 'notes');

  const notesToShow = showAll ? notes : notes.filter(note => note.important)

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
      id: notes.length + 1, //wont work if delete is added
    }
    noteService.create(noteObject)
    .then(returnedNote => {
      setNotes(notes.concat(returnedNote))
      setNewNote('')})
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const toggleImportance = (id) => {
    
    const note = notes.find(n => n.id === id)
    const changedNote = {...note, important: !note.important}
    
    noteService.update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(error => {
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
      setUser(user)
      console.log('logging in with', user);
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
      {!user ? 
        <LoginForm handleLogin={handleLogin} setPassword={setPassword} password={password}
          setUsername={setUsername} username={username} /> : 
        <div>
          <p> Logged in as {user.name}</p>
          <NoteForm addNote={addNote} newNote={newNote} handleNoteChange={handleNoteChange} />
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