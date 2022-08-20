const Note = ( { note, toggleImportance } ) => {
  const buttonLabel = note.important ?
    'make unimportant' : 'make important'
  return(
    <li className='note'>
      <span>{note.content} {' '} </span>
      {<button onClick={toggleImportance}> { buttonLabel } </button>}
    </li>
  )

}

export default Note