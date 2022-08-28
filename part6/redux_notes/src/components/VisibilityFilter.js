import { filterChange } from '../reducers/filterReducer'
import { useDispatch } from 'react-redux'

const VisibilityFilter = (props) => {
  const dispatch = useDispatch()

  return(
    <div>
      All <input type='radio' name='filter'
        onChange={() => dispatch(filterChange('ALL'))} />

      Important <input type='radio' name='filter'
        onChange={() => dispatch(filterChange('IMPORTANT'))} />

      Unimportant <input type='radio' name='filter'
        onChange={() => dispatch(filterChange('UNIMPORTANT'))} /> 
             
    </div>
  )
}

export default VisibilityFilter