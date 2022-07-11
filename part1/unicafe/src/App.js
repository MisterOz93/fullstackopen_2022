import { useState } from 'react'

const Button = ({onClick, name}) => {
  return (
    <button onClick={onClick}>{name}</button>
  )
}


const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const clickHandler = (review) => {
    if (review === 'g'){
      setGood(good + 1)
      return
    }
    review === 'n' ? setNeutral(neutral + 1) 
    : setBad(bad + 1)
  }
  return(
    <div>
     <h2>Give Feedback</h2>
     <Button name='good' onClick={() => clickHandler('g')}/>
     <Button name='neutral' onClick={() => clickHandler('n')}/>
     <Button name='bad' onClick={() => clickHandler('b')}/>
     <h2> Statistics</h2>
     <p>Good: {good}</p>
     <p>Neutral: {neutral}</p>
     <p>Bad: {bad}</p>
    </div>
  )
}

export default App;
