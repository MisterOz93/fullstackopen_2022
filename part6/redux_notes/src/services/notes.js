import axios from 'axios'

const baseUrl = 'http://localhost:3001/notes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNote = async (content) => {
  const note = { content, important: false}
  const res = await axios.post(baseUrl, note)
  return res.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, createNote }