import { connect }from 'react-redux'
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
  return(
    <ul>
      {props.notes.map(note => 
        <Note key={note.id} note={note} handleClick={() => 
          props.toggleImportanceOf(note.id)}
        />
      )}
    </ul>
  ) 
}

const mapStateToProps = (state) => {
  if (state.filter === 'ALL'){
    return {
      notes: state.notes
    }
  }
  return {
    notes: state.filter === 'IMPORTANT' 
  ? state.notes.filter(n => n.important)
  : state.notes.filter(n => !n.important)
  }
}

const mapDispatchToProps = {
  toggleImportanceOf,
}

const ConnectedNotes = connect(
  mapStateToProps,
  mapDispatchToProps
  )(Notes)

export default ConnectedNotes