const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    minlength: 3,
    required: true
  },
  name: {
    type: String,
  },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog"
    }
  ],
  passwordHash: String
})

userSchema.set("toJSON",{
  "transform": (document,returnedObj) => {
    returnedObj.id = returnedObj._id.toString()
    delete returnedObj.__v
    delete returnedObj._id
    delete returnedObj.passwordHash
  }
})


module.exports = mongoose.model("User",userSchema)