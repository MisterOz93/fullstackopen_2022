const errorStyle = {
  'color': 'red',
  'fontFamily': 'Arial',
  'maxWidth': '40%'
}

const DisplayError = ({ message }) => {
  return(
    <>
    <h3 style={errorStyle}>{ message }</h3>
    </>
  )
}

export default DisplayError