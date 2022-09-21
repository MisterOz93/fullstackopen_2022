import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload.sort((a, b) => b.likes - a.likes)
    },
    createBlog(state, action) {
      return state.concat(action.payload)
    },
    updateBlog(state, action) {
      return state
        .map((blog) => (blog.id !== action.payload.id ? blog : action.payload))
        .sort((a, b) => b.likes - a.likes)
    },
  },
})

export const { setBlogs, createBlog, updateBlog } = blogSlice.actions

export const blogsFromDb = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const addBlog = (blogObject) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blogObject)
    dispatch(createBlog(newBlog))
  }
}

export const addLike = (blogObject) => {
  return async (dispatch) => {
    const blogToUpdate = await blogService.getOne(blogObject)
    const updatedBlog = {
      ...blogToUpdate,
      likes: blogToUpdate.likes + 1,
    }
    const postedBlog = await blogService.update(blogToUpdate.id, updatedBlog)
    const blogWithUserInfo = {
      ...postedBlog,
      user: blogObject.user,
    }
    dispatch(updateBlog(blogWithUserInfo))
  }
}

export default blogSlice.reducer
