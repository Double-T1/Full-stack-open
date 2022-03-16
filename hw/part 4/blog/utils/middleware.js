// const logger = require("./logger")
const morgan = require("morgan")

//beware of the scope, i.e. 'this'
morgan.token("content",req => {
  return JSON.stringify(req.body) 
})
const requestLogger = morgan(":method :url :status :res[content-length] - :response-time ms :content")


//errorhandler and unknownEndpoint
const unknownEndpoint = (req,res) => {
  res.status(404).send({error: "unknown endpoint"})
}


const errorhandler = (error,req,res,next) => {
  if (error.name === "ValidationError") {
    return res.status(401).json({error: error.message})
  } 
  next(error)
}

module.exports = {requestLogger,unknownEndpoint,errorhandler}

