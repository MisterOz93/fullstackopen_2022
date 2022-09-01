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

export const setNotification = (message, seconds=10) => {
  return async dispatch => {

    dispatch(display(message))
    setTimeout(() => {
      dispatch(removeDisplay())
    }, seconds * 1000)
  }
}

export default notificationSlice.reducer