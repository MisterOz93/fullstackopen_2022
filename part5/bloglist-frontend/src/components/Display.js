
const messageStyle = {
  'color': 'green',
  'fontFamily': 'Arial',
  'maxWidth': '40%'
}

const errorStyle = {
  'color': 'red',
  'fontFamily': 'Arial',
  'maxWidth': '40%'
}

const Display = ({ message, error=null }) => {
  if (!error){
    return(
      <>
      <h3 style={messageStyle}> { message }</h3>
      </>
    )
  }
  return(
    <>
    <h3 style={errorStyle}>{ error }</h3>
    </>
  )
}

export default Display