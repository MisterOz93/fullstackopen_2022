import { useState } from 'react'

const Display = ( {counter} ) => <div> {counter}</div>

const Button = ( {name, onClick} ) => 
  <button onClick={onClick}>
    {name}
  </button>

const App = () => {
  const [ counter, setCounter ] = useState(0)
  const increment = () => setCounter(counter + 1)
  const decrement = () => setCounter(counter - 1)
  const reset = () => setCounter(0)

  return (
    <div>
    <Display counter={counter}/>
    <Button name="plus" onClick={increment} />
    <Button name="zero" onClick={reset} />
    <Button name="minus" onClick={decrement} />
    </div>
  )
}


export default App;