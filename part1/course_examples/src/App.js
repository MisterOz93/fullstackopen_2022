import { useState } from 'react'

const History = ( {allClicks} ) => {
  if (allClicks.length === 0){
    return(
      <div>
        Press buttons!
      </div>
    )
  }
  return(
    <div>
      Button history: {allClicks.join(' ')}
    </div>
  )
}

const Button = ( {name, onClick} ) => 
  <button onClick={onClick}>
    {name}
  </button>

const App = () => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)

  const [allClicks, setAllClicks] = useState([])
  const handleLeft = () => {
    setLeft(left + 1)
    setAllClicks(allClicks.concat('Left'))
  }

  const handleRight = () => {
  setRight(right + 1)
  setAllClicks(allClicks.concat('Right'))
  }

  return (
    <div>
      {left}
      <Button onClick={handleLeft} name='left' />
      <Button onClick={handleRight} name='right'/>
      {right}
      <History allClicks={allClicks} />
    </div>
  )
}


export default App;