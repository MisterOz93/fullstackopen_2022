import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    addAnecdote(state, action) {
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
      return state.sort((a, b) => a.votes - b.votes)
    },

    setAnecdotes(state, action) {
      return action.payload
    }
  }

})

export const {addAnecdote, addVote, setAnecdotes} = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export default anecdoteSlice.reducer