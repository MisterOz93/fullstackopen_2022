import axios from 'axios'
const personsURL = '/api/persons'

const getAll = () => {
  return axios.get(personsURL).then(res => res.data)
}

const create = (personObject) => {
  return axios.post(personsURL, personObject).then(res => res.data)
}

const deletePerson = (person) => {
  const request = axios.get(personsURL)
    .then(res => {
      const personToDelete = res.data.find(p => p.name === person.name)
      axios.delete(`${personsURL}/${personToDelete.id}`)
    })
    return request.then(res => res)
}

const updateNumber = (person) => {
  const request = axios.put(`${personsURL}/${person.id}`, person)
  return request.then(res => res.data)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {getAll, create, deletePerson, updateNumber}