import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useNotes = (url) => {
  const [notes, setNotes] = useState([])
  useEffect(() => {
    axios.get(url).then(response => {
      setNotes(response.data)
    })
  }, [url])
  return notes
}

const App = () => {
  const [counter, SetCounter] = useState(0)
  const [values, setValues] = useState([])
  const url = 'https://obscure-harbor-49797.herokuapp.com/api/notes'
  const notes = useNotes(BACKEND_URL)

  const handleClick = () => {
    SetCounter(counter + 1)
    setValues(values.concat(counter))
  }
  return (
    <div className='container'>
      hello webpack {counter} clicks.
      <button onClick={handleClick}>
        Press
      </button>
      <div>{notes.length} notes on server {BACKEND_URL}</div>
    </div>
  )
}

export default App