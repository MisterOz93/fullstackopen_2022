import { addComment } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import { useState } from 'react'

const Comments = ({ blog }) => {
  const dispatch = useDispatch()
  const [content, setContent] = useState('')

  const comments = blog.comments

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(addComment(blog, content))
    setContent('')
  }

  console.log('user is', blog.user)

  return (
    <div>
      <h3>Comments</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={content}
          onChange={(event) => setContent(event.target.value)}
        />
        <button type="submit">add comment</button>
      </form>
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
