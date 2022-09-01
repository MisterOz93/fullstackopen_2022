import { useSelector, useDispatch } from 'react-redux'
import { updateAnecdote } from '../reducers/anecdoteReducer'
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

  const state = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    dispatch(updateAnecdote(anecdote))
    dispatch(setNotification(`You voted for ${anecdote.content}`))
    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)
  }

  return (
    
    <div>
      {!state.filter
      ? 
        state.anecdotes.map( a => 
          <Anecdote key={a.id} anecdote={a} vote={vote} />)
      :
        state.anecdotes.filter(a => a.content.toLowerCase().includes(state.filter))
          .map(a => <Anecdote key={a.id} anecdote={a} vote={vote} />)
      }
    </div>
  )
}

export default AnecdoteList