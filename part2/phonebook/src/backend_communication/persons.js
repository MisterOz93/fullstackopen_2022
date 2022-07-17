import axios from 'axios'
const personsURL = 'http://localhost:3001/persons'

const getAll = () => {
  return axios.get(personsURL).then(res => res.data)
}

const create = (personObject) => {
  return axios.post(personsURL, personObject).then(res => res.data)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {getAll, create}