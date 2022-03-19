const Blog = require("../models/blogs")

const initialUsers = [
  {
    username: "John",
    name: "Schlong",
    password: "1234567",
    blogs: []
  }
]

const initialBlogs = [
  {
    title: "2ality",
    author: "Dr. Axel Rauschmayer",
    url: "https://2ality.com/",
    likes: 17,
    user: null
  }, {
    title: "Daily Dev Tips",
    author: "Chris Bongers",
    url: "https://daily-dev-tips.com/",
    likes: 69,
    user: null
  }
]



const blogsInDB = async () => {
  const blogs =  await Blog.find({})
  //the toJSON functin utilize the middleware we customized at the creation of the schema
  //whcih is at /models/blogs.js
  //it prases every document return from the DB, making the id string from _id object
  //and deleting the __v property
  return blogs.map(ele => ele.toJSON())
}



module.exports = {initialUsers,initialBlogs,blogsInDB}