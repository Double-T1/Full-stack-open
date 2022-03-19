const User = require("../models/users")
const usersRouter = require("express").Router()
const bcrypt = require("bcrypt")

usersRouter.get("/",async(req,res) => {
  const userList = await User
    .find({}).populate("blogs",{title: 1, author: 1, url: 1, likes: 1})
  res.json(userList)
})


usersRouter.post("/",async(req,res) => {
  const {username,name,password} = req.body
  if (password.length<3) {
    return res.status(401).json({error: "password length should be longer than 2 characters"})
  }
  const doesExist = await User.findOne({username})
  if (doesExist) {
    return res.status(401).json({error: "username already exists"})
  }

  //why the fuck??
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password,saltRounds)

  const user = new User({
    username, name, passwordHash
  })

  const savedUser = await user.save()
  res.status(201).json(savedUser)
})

usersRouter.delete("/", async(req,res) => {
  await User.deleteMany({})
  res.status(204).end()
})

module.exports = usersRouter