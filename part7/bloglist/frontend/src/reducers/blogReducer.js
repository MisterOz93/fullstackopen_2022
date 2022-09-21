import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      console.log('payload is', action.payload)
      return action.payload.sort((a, b) => b.likes - a.likes)
    },
  },
  createBlog(state, action) {},
})

export const { setBlogs, createBlog } = blogSlice.actions

export const blogsFromDb = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export default blogSlice.reducer
