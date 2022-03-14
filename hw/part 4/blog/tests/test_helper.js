const Blog = require("../models/blogs")

const initialBlogs = [
  {
    title: "2ality",
    author: "Dr. Axel Rauschmayer",
    url: "https://2ality.com/",
    likes: 17
  }, {
    title: "Daily Dev Tips",
    author: "Chris Bongers",
    url: "https://daily-dev-tips.com/",
    likes: 69
  }
]

const blogsInDB = async () => {
  const blogs =  await Blog.find({})
  return blogs.map(ele => ele.toJSON())
}



module.exports = {initialBlogs,blogsInDB}