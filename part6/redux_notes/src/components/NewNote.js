import { useDispatch } from 'react-redux'
import { createNote } from '../reducers/noteReducer'
import noteService from '../services/notes'

const NewNote = (props) => {
  const dispatch = useDispatch()

  const addNote = async (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    const newNote = await noteService.createNote(content) 
    dispatch(createNote(newNote))
  }
  
  return(
    <form onSubmit={addNote}>
      <input id='note_input' name='note' />
      <button type='submit' id='note_submit'>
        Add Note
      </button>
    </form>
  )
}

export default NewNote