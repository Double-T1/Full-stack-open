// const logger = require("./logger")
const morgan = require("morgan")

//beware of the scope, i.e. 'this'
morgan.token("content",req => {
  return JSON.stringify(req.body) 
})
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



//errorhandler and unknownEndpoint
const unknownEndpoint = (req,res) => {
  res.status(404).send({error: "unknown endpoint"})
}


const errorhandler = (error,req,res,next) => {
  if (error.name === "ValidationError") {
    return res.status(401).json({error: error.message})
  } else if (error.name === "JsonWebTokenError") {
    return res.status(401).json({error: "invalid token"})
  } else if (error.name === "TokenExpiredError") {
    return res.status(401).json({error: "token expired"})
  }
  next(error)
}

module.exports = {requestLogger,tokenExtracter,unknownEndpoint,errorhandler}

