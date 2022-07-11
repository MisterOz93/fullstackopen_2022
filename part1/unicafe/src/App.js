import { useState } from 'react'

const Button = ( {onClick, name} ) => {
  return (
    <button onClick={onClick}>{name}</button>
  )
}

const Average = ( {scores, total} ) => {
  const avg = !total ? 0 
  :
  scores.reduce((sum, num) => sum + num) / total
  
  return(
    <p>Average: {avg} </p>
  )
}

const PercentPositive = ( {scores, total} ) => {
  const percentPositive = ! total ? 'n/a'
  :
  `${scores.filter(score => score === 1).length / 
    total * 100}%`
  return(
    <p>Positive Reviews: {percentPositive}</p>
  )

}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [scores, setScores] = useState([])
  //^good = +1 neut = 0 bad = -1 for scores

  const clickHandler = (review) => {
    if (review === 'g'){
      setGood(good + 1)
      setScores(scores.concat(1))
    }
    else if (review === 'n'){
      setNeutral(neutral + 1)
      setScores(scores.concat(0))
      
    } 
    else {
      setBad(bad + 1) 
      setScores(scores.concat(-1))
    }
    setTotal(total + 1)
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
     <p>Total: {total} </p>
     <Average scores={scores} total={total} />
     <PercentPositive scores={scores} total={total} />
    </div>
  )
}

export default App;
