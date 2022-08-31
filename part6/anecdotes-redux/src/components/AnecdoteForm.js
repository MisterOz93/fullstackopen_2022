import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'
const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const handleSubmit = (event) => {
    event.preventDefault()
    const input = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(addAnecdote(input))
    dispatch(setNotification(`Added anecdote: ${input}`))
    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)
  }

  return(
    <form onSubmit={handleSubmit}>
      <h2>Create new Anecdote </h2>
      <input type='text' name='anecdote' />
      <button type='submit'>Create</button>
    </form>
  )
}

export default AnecdoteForm