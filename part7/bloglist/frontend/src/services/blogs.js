import axios from 'axios'
const baseUrl = '/api/blogs'
let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getOne = async (blog) => {
  const response = await axios.get(`${baseUrl}/${blog.id}`)
  return response.data
}

const create = async (blog) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, blog, config)
  return response.data
}

const createComment = async (blogId, comment) => {
  const commentObject = {
    content: comment,
  }
  const response = await axios.post(
    `${baseUrl}/${blogId}/comments`,
    commentObject
  )
  return response.data //this is the comment data
}

const update = async (id, newBlog) => {
  const response = await axios.put(`${baseUrl}/${id}`, newBlog)
  return response.data
}

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

export default {
  getAll,
  getOne,
  setToken,
  create,
  createComment,
  update,
  deleteBlog,
}
