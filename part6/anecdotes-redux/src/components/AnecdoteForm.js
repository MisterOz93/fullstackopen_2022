import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import anecdoteService from '../services/anecdotes'
import { setNotification, removeNotification } from '../reducers/notificationReducer'
const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const handleSubmit = async (event) => {
    event.preventDefault()
    const input = event.target.anecdote.value
    event.target.anecdote.value = ''
    const anecdote = await anecdoteService.createAnecdote(input)
    dispatch(addAnecdote(anecdote))
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