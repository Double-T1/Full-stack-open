const blogsRouter = require("express").Router()
const Blog =  require("../models/blogs")
const middleware = require("../utils/middleware")


blogsRouter.get("/", async (req, res) => {
  const blogLists = await Blog
    .find({}).populate("user",{username: 1, name: 1})
  res.json(blogLists)
})


blogsRouter.post("/", middleware.userExtracter,async (req, res) => {
  const body = req.body
  const user = req.user
  
  const blog = new Blog({
    author: body.author,
    title: body.title,
    url: body.url,
    likes: body.likes,
    user: user.id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  res.status(201).json(savedBlog)
})

//only the owner/user of the blog can delete it
//1. convert the token into userID
//2. check if the userID is the blog user (blog user is an Object)
//3. delete the blog document
//4. delete the blog from the user bloglist
blogsRouter.delete("/:id",middleware.userExtracter,async (req, res) => {
  const user = req.user

  const blog = await Blog.findById(req.params.id)
  if (!blog) return res.status(401).json({error: "the blog is already deleted"})

  if (blog.user.toString()!== user.id) {
    return res.status(401).json({error: "user not the owner of the blog"})
  }

  await Blog.findByIdAndDelete(req.params.id)
  
  user.blogs = user.blogs.filter(blogId => blogId.toString() !== req.params.id)
  await user.save()
  res.status(204).end()
})

//updating the number of likes
blogsRouter.put("/:id",middleware.userExtracter,async (req, res) => {
  const user = req.user
  const blog = await Blog.findById(req.params.id)
  if (blog.user.toString()!== user.id) {
    return res.status(401).json({error: "user not the owner of the blog"})
  }

  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id,{likes: req.body.likes},{new:true})
  res.json(updatedBlog)
})

blogsRouter.delete("/", async(req,res) => {
  await Blog.deleteMany({})
  res.status(204).end()
})

module.exports = blogsRouter
