import React, { useState } from 'react'
import './index.css'

const App = () => {
  const [counter, SetCounter] = useState(0)
  const [values, setValues] = useState([])

  const hanldeClick = () => {
    SetCounter(counter + 1)
    setValues(values.concat(counter))
  }
  return (
    <div className='container'>
      hello webpack {counter} clicks.
      <button onClick={hanldeClick}>
        Press
      </button>
    </div>
  )
}

export default App