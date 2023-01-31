import { connect } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
const AnecdoteForm = (props) => {

  const handleSubmit = (event) => {
    event.preventDefault()
    const input = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.addAnecdote(input)
    props.setNotification(`Added anecdote: ${input}`, 10)
  }

  return(
    <form onSubmit={handleSubmit}>
      <h2>Create new Anecdote </h2>
      <input type='text' id='anecdote_content_input' name='anecdote' />
      <button type='submit' id='create_anecdote_button'>Create</button>
    </form>
  )
}

const mapDispatchToProps = {
  addAnecdote,
  setNotification
}

const ConnectedAnecdoteForm = connect(
  null, mapDispatchToProps)(AnecdoteForm)

export default ConnectedAnecdoteForm