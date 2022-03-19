const loginRouter = require("express").Router()
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const User = require("../models/users")

loginRouter.post("/",async(req,res) => {
  const {username, password} = req.body
  //1. check the usename and password
  //2. create a token and send it back to the browser
  //more of a client-side session => create a certain timeframe
  const user = await User.findOne({username})
  const passwordCorrect = user === null ?
    null 
    : bcrypt.compare(password,user.passwordHash)

  if (!user || !passwordCorrect) {
    return res.status(401).json({error: "incorrect username or password"})
  }

  const userForToken = {
    username: user.username,
    id: user._id
  }

  const token = jwt.sign(
    userForToken, 
    process.env.SECRET,
    {expiresIn: 120*60}
  )

  res.status(200).json({token,id: user.id,username: user.username, name: user.name})
})



module.exports = loginRouter