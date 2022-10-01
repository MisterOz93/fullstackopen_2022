import { Alert } from 'react-bootstrap'

const errorStyle = {
  color: 'red',
  fontFamily: 'Arial',
  maxWidth: '40%',
}

const Display = ({ message, error }) => {
  if (!error) {
    return (
      <>
        <Alert variant="success" id="display_message">
          {' '}
          {message}
        </Alert>
      </>
    )
  }
  return (
    <>
      <h3 id="error_message" style={errorStyle}>
        {message}
      </h3>
    </>
  )
}

export default Display
