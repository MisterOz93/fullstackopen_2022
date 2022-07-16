const Note = ( {note, toggleImportance} ) => {
  const buttonLabel = note.important ?
    "make unimportant" : "make important" 
  return(
    <li>
      {note.content} {' '}
      {<button onClick={toggleImportance}> { buttonLabel } </button>}
    </li>
  )

}

export default Note