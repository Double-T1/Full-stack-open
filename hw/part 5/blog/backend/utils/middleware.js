// const logger = require("./logger")
const morgan = require("morgan")
const User = require("../models/users")
const jwt = require("jsonwebtoken")


//beware of the scope, i.e. 'this'
morgan.token("content",req => JSON.stringify(req.body))
const requestLogger = morgan(":method :url :status :res[content-length] - :response-time ms :content")

const tokenExtracter = (req,res,next) => {
  //specified HTTP request header field which is case-insensitive match 
  //and the Referrer and Referrer fields are interchangeable.
  const authorization = req.get("authorization")
  //in other words, the client side will have to incorporate the token in the head after receiving it the first time
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    req.token = authorization.substring(7)
  } else {
    req.token = null
  }
  next() //calls the next middleware inline
}

//extract the users and set them as req.user
//since it uses req.token, it has to come after req.token in app.js
const userExtracter = async (req,res,next) => {
  //token comprises of username and id
  const decodedToken = await jwt.verify(req.token,process.env.SECRET)
  if (!decodedToken.id) {
    return res.status(401).json({error: "invalid username or password"})
  } else {
    req.user = await User.findById(decodedToken.id)
    next()
  }
}

//errorhandler and unknownEndpoint
const unknownEndpoint = (req,res) => {
  res.status(404).send({error: "unknown endpoint"})
}


const errorhandler = (error,req,res,next) => {
  if (error.name === "ValidationError") {
    return res.status(400).json({error: error.message})
  } else if (error.name === "JsonWebTokenError") {
    return res.status(401).json({error: "invalid token"})
  } else if (error.name === "TokenExpiredError") {
    return res.status(401).json({error: "token expired"})
  }
  next(error)
}

module.exports = {requestLogger,userExtracter,tokenExtracter,unknownEndpoint,errorhandler}

