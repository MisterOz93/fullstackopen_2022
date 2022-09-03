import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    display(state, action) {
      return action.payload
    },
    removeDisplay() {
      return ''
    }

  }

})

export const { display, removeDisplay } = notificationSlice.actions

let timeoutId

export const setNotification = (message, seconds=5) => {
  return async dispatch => {

    //console.log('timeoutId is type:', typeof timeoutId)

    if (typeof timeoutId === 'number'){
      clearTimeout(timeoutId)
    }

    dispatch(display(message))
    
    timeoutId = setTimeout(() => {
      dispatch(removeDisplay())
    }, seconds * 1000)

  }
}

export default notificationSlice.reducer