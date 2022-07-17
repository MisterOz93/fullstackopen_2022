const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
  }

  const pStyle = {
    fontWeight: 'bold',

  }

  return (
    <footer style={footerStyle}>
     <p style={pStyle}> Note app, Department of Computer Science, University of Helsinki 2022</p>
    </footer>
  )
}

export default Footer