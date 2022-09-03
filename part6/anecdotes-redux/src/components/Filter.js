import { connect } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const Filter = (props) => {
  
  const handleChange = (event) => {
    const query = event.target.value
    props.setFilter(query.toLowerCase())
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

const mapDispatchToProps = {
  setFilter,
}

const ConnectedFilter = connect(null, mapDispatchToProps)(Filter)

export default ConnectedFilter