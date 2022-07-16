import axios from 'axios'
const baseUrl = 'http://localhost:3001/notes'

const getAll = () => {
  const tempNote = {
    id: 777,
    content: 'not on server',
    date: 'whenever',
    important: true
  }
  return axios.get(baseUrl).then(res => res.data.concat(tempNote))
}

const create = newObject => {
  return axios.post(baseUrl, newObject).then(res => res.data)
}

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject).then(res => res.data)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, update }