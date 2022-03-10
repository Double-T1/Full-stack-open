const dummy = () => {
  return 1
}

const totalLikes = (blogList) => {
  if (blogList.length ===0) return 0
  return blogList.reduce((accu,ele) => accu+ele.likes,0)
}

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

const mostBlogs = (blogList) => {
  let map = new Map() //could also use trie to store the author name
  //the best practice may be storing a cache, 
  //so that we don't have to traverse the whole array each time the function is called
  let max = -1, mostAuth = ""
  for (let blog of blogList) {
    let author = blog.author
    if (!map.has(author)) map.set(author,0)
    let amount = map.get(author)+1
    map.set(author,amount)
    if (max<amount) max = amount, mostAuth = author
  }
  return {author: mostAuth, blogs:max}
}

module.exports = {dummy,totalLikes,favoriteBlog,mostBlogs}