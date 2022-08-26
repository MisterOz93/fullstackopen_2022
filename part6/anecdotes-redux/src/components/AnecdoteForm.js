
const AnecdoteForm = ({ createAnecdote }) => {

  const handleSubmit = (event) => {
    event.preventDefault()
    const input = event.target.anecdote.value
    event.target.anecdote.value = ''
    createAnecdote(input)
  }
  return(
    <form onSubmit={handleSubmit}>
      <input type='text' name='anecdote' />
      <button type='submit'>Create</button>
    </form>
  )
}

export default AnecdoteForm