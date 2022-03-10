const mongoUrl = require("./utils/config").mongoUrl
const logger = require("./utils/logger")
const express = require("express") //to better handle the whole node.js application
const app = express() //an instance of express
const cors = require("cors") 
const mongoose = require("mongoose") //to better manipulate mongoDB
const blogsRouter = require("./controller/blogs")
const middleware = require("./utils/middleware")

//connecting to database
logger.info(`connecting to ${mongoUrl}`)
mongoose.connect(mongoUrl)
  .then(() => {
    logger.info("connected to MongoDB")
  })
  .catch(err=> {
    logger.error("unable to connect to mongoDB due to ",err.message)
  })

app.use(cors()) //cross origin enabler
app.use(express.json()) //body-parser
//app.use(express.static('build'))
app.use(middleware.requestLogger)

app.get("/", (req, res) => res.send("go to /api/blogs"))
app.use("/api/blogs",blogsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorhandler)

module.exports = app
