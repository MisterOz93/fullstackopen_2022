/* eslint-disable react/prop-types */
import { useSelector, useDispatch } from 'react-redux'
import { updateAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, vote }) => {
  return (
    <div id={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
        Has <span id='votes'>{anecdote.votes} {anecdote.votes !== 1 ? 'votes ' : 'vote '} </span>
        <button id='vote_button' onClick={() => vote(anecdote)}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {

  const state = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    dispatch(updateAnecdote(anecdote))
    dispatch(setNotification(`You voted for ${anecdote.content}`, 5))
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