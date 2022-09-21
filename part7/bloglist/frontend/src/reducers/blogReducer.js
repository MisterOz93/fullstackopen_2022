import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
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

export const addBlog = (blogObject) => {
  return async (dispatch) => {
    await blogService.create(blogObject)
    const blogsAfterPost = await blogService.getAll()
    dispatch(setBlogs(blogsAfterPost))
  }
}

export default blogSlice.reducer
