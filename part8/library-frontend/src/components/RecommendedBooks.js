const RecommendedBooks = (props) => {
  if (!props.show || !props.user.me) {
    return null
  }
  const genre = props.user.me.favouriteGenre
  return (
    <div>
      <h2>Recommended Books</h2>
      <h4>
        Books in your favorite genre <em>{genre}</em>
      </h4>
    </div>
  )
}

export default RecommendedBooks
