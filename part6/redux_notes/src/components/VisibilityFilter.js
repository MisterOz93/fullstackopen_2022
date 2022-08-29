import { filterChange } from '../reducers/filterReducer'
import { useDispatch } from 'react-redux'

const VisibilityFilter = (props) => {
  const dispatch = useDispatch()

  const radioStyle = {
    'marginRight': '3%'
  }

  return(
    <div>
      <h4>Select Notes to Display: </h4>
      All <input style={radioStyle} type='radio' name='filter'
        onChange={() => dispatch(filterChange('ALL'))} />

      Important <input style={radioStyle} type='radio' name='filter'
        onChange={() => dispatch(filterChange('IMPORTANT'))} />

      Unimportant <input style={radioStyle} type='radio' name='filter'
        onChange={() => dispatch(filterChange('UNIMPORTANT'))} /> 
             
    </div>
  )
}

export default VisibilityFilter