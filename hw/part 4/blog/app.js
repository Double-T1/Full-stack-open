require('dotenv').config() //to be able to parse env file
const http = require('http')
const express = require('express') //to better handle the whole node.js application
const app = express() //an instance of express
const cors = require('cors') 
const mongoose = require('mongoose') //to better manipulate mongoDB

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})
//we can actually define this while creating blogSchema above
//after all, we merely including a method that serves as a middleware between db and server
blogSchema.set('toJSON', {
  'transform': (document,returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Blog = mongoose.model('Blog', blogSchema)

//connecting to database
const mongoUrl = process.env.MONGODB_URI
console.log(`connecting to ${mongoUrl}`)
mongoose.connect(mongoUrl)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch(err=> {
    console.log(`unable to connect to mongoDB due to ${err.message}`)
  })

app.use(cors()) //cross origin enabler
app.use(express.json()) //body-parser

app.get('/', (req, res) => {
  res.send('go to /api/blogs')
})


app.get('/api/blogs', (req, res) => {
  Blog
    .find({})
    .then(blogs => {
      res.json(blogs)
    })
})

app.post('/api/blogs', (req, res) => {
  const blog = new Blog(req.body)

  blog
    .save()
    .then(result => {
      res.status(201).json(result)
    })
})

const PORT = process.env.PORT
console.log(PORT)
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})