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
    deleteBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload)
    },
  },
})

export const { setBlogs, createBlog, updateBlog, deleteBlog } =
  blogSlice.actions

export const blogsFromDb = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const addBlog = (blogObject) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.create(blogObject)
      dispatch(createBlog(newBlog))
    } catch (exception) {
      return exception
    }
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

export const addComment = (blogObject, comment) => {
  return async (dispatch) => {
    const blogToUpdate = await blogService.getOne(blogObject)

    const postedComment = await blogService.createComment(
      blogToUpdate.id,
      comment
    )
    const blogWithNewComment = {
      ...blogToUpdate,
      comments: blogToUpdate.comments.concat([postedComment]),
    }

    dispatch(updateBlog(blogWithNewComment))
  }
}

export const removeBlog = (id) => {
  return async (dispatch) => {
    await blogService.deleteBlog(id)
    dispatch(deleteBlog(id))
  }
}

export default blogSlice.reducer
