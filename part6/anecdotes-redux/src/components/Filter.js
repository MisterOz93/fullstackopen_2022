import { useDispatch } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const Filter = () => {
  const dispatch = useDispatch()
  const handleChange = (event) => {
    const query = event.target.value
    dispatch(setFilter(query.toLowerCase()))
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      Show anecdotes containing: <input onChange={handleChange} />
    </div>
  )
}

export default Filter