const dummy = (blogs) => {
    return 1
  }

  const totalLikes = (blogs) => {
      return blogs.reduce((acc,curr) => acc + curr.likes,0)
  }
  const favoriteBlog = (blogs) => {
      return blogs.reduce((p, v) => (p.likes > v.likes ? p:v))
  }
  
  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
  }