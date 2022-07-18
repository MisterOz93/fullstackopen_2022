const Message = ({message, error=false}) => {
  if (message === null){
    return null
  }

  const messageStyle = {
    border: 'solid green 2px',
    backgroundColor: 'lightgrey',
    color: 'green',
    padding: 10,
    marginBottom: 10,
    width: '30%'
  }
  if(!error){
    return(
      <div style={messageStyle}> {message}</div>
    )
  }
  const errorStyle = {...messageStyle, color: 'red', border: 'solid red 2px'}
  return(
    <div style={errorStyle}>{message}</div>
  )
}

export default Message