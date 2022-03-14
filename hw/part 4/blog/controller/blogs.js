const blogsRouter = require("express").Router()
const Blog =  require("../models/blogs")

blogsRouter.get("/", async (req, res) => {
  const blogLists = await Blog.find({})
  res.json(blogLists)
})

blogsRouter.post("/", async (req, res) => {
  const blog = new Blog(req.body)

  const result = await blog.save()
  res.status(201).json(result)
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

module.exports = blogsRouter
