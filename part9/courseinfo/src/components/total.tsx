interface totalProps {
  sum: number
}

const Total = (props: totalProps) => {
  return <p>Total: {props.sum} </p>
}

export default Total