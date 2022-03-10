const blogsRouter = require('express').Router()
const Blog =  require('../models/blogs')

blogsRouter.get('/', (req, res) => {
  Blog.find({})
    .then(blogs => {
      res.json(blogs)
    })
})

blogsRouter.post('/', (req, res) => {
  const blog = new Blog(req.body)

  blog.save()
    .then(result => {
      res.status(201).json(result)
    })
})

blogsRouter.delete('/:id',(req, res) => {
  Blog.findByIdAndDelete(req.params.id)
    .then(() => res.status(204).end())
})

module.exports = blogsRouter
