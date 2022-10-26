const RecommendedBooks = (props) => {
  if (!props.show) {
    return null
  }
  return (
    <div>
      <h2>Recommended Books</h2>
      <h4>
        Books in your favorite genre <em>{props.genre}</em>
      </h4>
    </div>
  )
}

export default RecommendedBooks
