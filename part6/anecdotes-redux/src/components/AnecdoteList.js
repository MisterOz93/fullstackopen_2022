import { useSelector, useDispatch } from "react-redux"
import { addVote } from "../reducers/anecdoteReducer"

const Anecdote = ({ anecdote, vote }) => {
  return (
    <div id={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
        Has {anecdote.votes} {anecdote.votes !== 1 ? 'votes ' : 'vote '}
        <button onClick={() => vote(anecdote.id)}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {

  const state = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(addVote(id))
  }

return (
  <div>
    {state.anecdote.map( a => 
      <Anecdote key={a.id} anecdote={a} vote={vote} />)}
  </div>
)

}

export default AnecdoteList