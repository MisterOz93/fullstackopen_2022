const errorStyle = {
  color: 'red',
}

const Notification = ({ errorMessage }) => {
  if (!errorMessage) {
    return null
  }
  return <div style={errorStyle}>{errorMessage}</div>
}

export default Notification
