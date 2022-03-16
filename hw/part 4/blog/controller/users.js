const User = require("../models/users")
const usersRouter = require("express").Router()
const bcrypt = require("bcrypt")

usersRouter.get("/",async(req,res) => {
  console.log("get all")  
  const userList = await User.find({})
  res.json(userList)
})


usersRouter.post("/",async(req,res) => {
  const {username,name,password} = req.body

  //why the fuck??
  const saltRounds = 10
  const passwordHash = await bcrypt(password,saltRounds)

  const user = new User({
    username, name, passwordHash
  })

  const savedUser = await user.save()
  res.status(201).json(savedUser)
})

module.exports = usersRouter