const mongoose = require("mongoose") //to better manipulate mongoDB

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})
//we can actually define this while creating blogSchema above
//after all, we merely including a method that serves as a middleware between db and server
blogSchema.set("toJSON", {
  "transform": (document,returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model("Blog", blogSchema)