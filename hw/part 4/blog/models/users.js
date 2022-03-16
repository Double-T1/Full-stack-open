const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  username: String,
  name: String,
  passwordHash: String
})

userSchema.set("toJSON",{
  function: (document,returnedObj) => {
    returnedObj.id = returnedObj._id.toString()
    delete returnedObj.__v
    delete returnedObj._id
    delete returnedObj.passwordHash
  }
})


module.exports = mongoose.model("User",userSchema)