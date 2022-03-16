const blogsRouter = require("express").Router()
const Blog =  require("../models/blogs")
const User = require("../models/users")
const jwt = require("jsonwebtoken")

blogsRouter.get("/", async (req, res) => {
  const blogLists = await Blog
    .find({}).populate("user",{username: 1, name: 1})
  res.json(blogLists)
})


blogsRouter.post("/", async (req, res) => {
  const body = req.body
  //SECRET is stored on the server, and token is from the browser
  const decodedToken = jwt.verify(req.token,process.env.SECRET)
  if(!decodedToken.id) {
    return res.status(401).json({
      error: "token missing or invalid"
    })
  }
  const user = await User.findById(body.user)

  const blog = new Blog({
    author: body.author,
    title: body.title,
    url: body.url,
    likes: body.likes,
    user: user._id
  })
  //why didn't the toJSON middleware worked here?

  const savedBlog = await blog.save()
  user.notes = user.blogs.concat(savedBlog._id)
  await user.save()

  res.status(201).json(savedBlog)
})

blogsRouter.delete("/:id",async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id)
  res.status(204).end()
})

//updating the number of likes
blogsRouter.put("/:id",async (req, res) => {
  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id,{likes: req.body.likes},{new:true})
  res.json(updatedBlog)
})

blogsRouter.delete("/", async(req,res) => {
  await Blog.deleteMany({})
  res.status(204).end()
})

module.exports = blogsRouter
