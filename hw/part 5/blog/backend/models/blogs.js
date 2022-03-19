const mongoose = require("mongoose") //to better manipulate mongoDB

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: String,
  url: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    default: 0
  }, 
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
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