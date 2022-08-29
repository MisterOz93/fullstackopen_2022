import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, vote }) => {
  return (
    <div id={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
        Has {anecdote.votes} {anecdote.votes !== 1 ? 'votes ' : 'vote '}
        <button onClick={() => vote(anecdote)}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {

  const state = useSelector(state => state.anecdotes)
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    dispatch(addVote(anecdote.id))
    dispatch(setNotification(`You voted for ${anecdote.content}`))
    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)
  }

return (
  <div>
    {state.map( a => 
      <Anecdote key={a.id} anecdote={a} vote={vote} />)}
  </div>
)

}

export default AnecdoteList