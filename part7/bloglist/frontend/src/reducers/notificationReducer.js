import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    message: null,
    error: false,
  },
  reducers: {
    displayMessage(state, action) {
      return {
        message: action.payload.message,
        error: action.payload.error,
      }
    },
    resetDisplay() {
      return {
        message: null,
        error: false,
      }
    },
  },
})

export const { displayMessage, resetDisplay } = notificationSlice.actions

export default notificationSlice.reducer
