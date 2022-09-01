import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {

    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    
    addVote(state, action) {
      const id = action.payload
      const anecdoteToUpdate = state.find(a => a.id === id)
      const changedAnecdote = {
        ...anecdoteToUpdate, 
        votes: anecdoteToUpdate.votes + 1 
      }
      return state.map(a => a.id !== id ? a : changedAnecdote)
        .sort((a, b) => b.votes - a.votes)
    },
    
    sortAnecdotes(state) {
      return state.sort((a, b) => b.votes - a.votes)
    },

    setAnecdotes(state, action) {
      const anecdotes = action.payload
      return anecdotes.sort((a, b) => b.votes - a.votes)
    },
  }

})

export const { appendAnecdote, addVote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const addAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createAnecdote(content)
    dispatch(appendAnecdote(newAnecdote))
  }

}

export const updateAnecdote = (anecdote) => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.updateAnecdote(anecdote)
    dispatch(addVote(updatedAnecdote.id))
  }
}

export default anecdoteSlice.reducer