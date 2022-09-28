const Comments = ({ comments }) => {
  return (
    <div>
      <h3>Comments</h3>
      <ul>
        {comments.length === 0 && <p>No comments yet.</p>}
        {comments &&
          comments.map((comment) => (
            <li key={comment.id}>{comment.content}</li>
          ))}
      </ul>
    </div>
  )
}
export default Comments
