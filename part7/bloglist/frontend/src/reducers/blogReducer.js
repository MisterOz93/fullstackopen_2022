import { createSlice } from '@reduxjs/toolkit'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    displayAll(state, action) {},
  },
})

export default blogSlice.reducer
