import NewNote from './components/NewNote'
import Notes from './components/Notes'
import VisibilityFilter from './components/VisibilityFilter'
import noteService from './services/notes'
import { useEffect } from 'react'
import { setNotes } from './reducers/noteReducer'
import { useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    noteService.getAll().then(notes => {
      dispatch(setNotes(notes))
    })
  }, [dispatch])
  return(
    <div>
      <NewNote />
      <VisibilityFilter />
      <h2> Notes </h2>
      <Notes />
    </div>
  )
}
export default App