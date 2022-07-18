const Message = ({message}) => {
  if (message === null){
    return null
  }

  const messageStyle = {
    border: 'solid green 2px',
    backgroundColor: 'lightgrey',
    color: 'green',
    padding: 10,
    marginBottom: 10,
    width: '50%'
  }
  return(
    <div style={messageStyle}> {message}</div>
  )
}

export default Message