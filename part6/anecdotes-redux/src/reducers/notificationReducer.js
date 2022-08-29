import { createSlice } from '@reduxjs/toolkit'

const initialState = 'render here notification...'
const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setNotification(state, action) {
      return action.payload
    }

  }

})

export const { setNotification } = notificationSlice.actions
export default notificationSlice.reducer