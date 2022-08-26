import { useSelector, useDispatch } from 'react-redux'
import { toggleImportanceOf } from '../reducers/noteReducer'

const Note = ({ note, handleClick }) => {

  return(
    <li onClick ={handleClick}>
      {note.content} 
      <strong>{!note.important ? '' : ' Important'} </strong>
    </li>
  )

}

const Notes = (props) => {
  const dispatch = useDispatch()
  const notes = useSelector(state => state)

  return(
    <ul>
      {notes.map(note => 
        <Note key={note.id} note={note} handleClick={() => 
          dispatch(toggleImportanceOf(note.id))}
        />
      )}
    </ul>
  ) 
}

export default Notes