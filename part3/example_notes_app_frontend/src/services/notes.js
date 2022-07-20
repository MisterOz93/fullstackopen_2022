import axios from 'axios'
const baseUrl = '/api/notes'

const getAll = () => {
  return axios.get(baseUrl).then(res => res.data)
}

const create = newObject => {
  return axios.post(baseUrl, newObject).then(res => res.data)
}

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject).then(res => res.data)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, update }