import NewNote from './components/NewNote'
import Notes from './components/Notes'
import VisibilityFilter from './components/VisibilityFilter'

const App = () => {
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