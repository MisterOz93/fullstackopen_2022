const dummy = (blogs) => {
  return blogs ? 1 : 1
}

const totalLikes = (blogs=[]) => {
  if (blogs.length === 0){ return 0}
  const likes = blogs.map(blog => blog.likes)
  console.log(likes)
  return likes.reduce((sum, num) => sum + num, 0)
}

module.exports = { dummy, totalLikes }
