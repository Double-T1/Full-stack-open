const dummy = () => {
  return 1
}

const totalLikes = (blogList) => {
  if (blogList.length ===0) return 0
  return blogList.reduce((accu,ele) => accu+ele.likes,0)
}

/**
 * 
 * {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    likes: 12
  }
 */
const favoriteBlog = (blogList) => {
  let max = -1, favBlog = null
  for (let blog of blogList) {
    if (blog.likes>max) {
      max = blog.likes
      favBlog = {
        title: blog.title,
        author: blog.author,
        likes: blog.likes  
      }
    }
  }
  return favBlog
}

module.exports = {dummy,totalLikes,favoriteBlog}