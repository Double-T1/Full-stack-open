require("dotenv").config() //to be able to parse env file

const mongoUrl = process.env.NODE.ENV === "test"?
  process.env.TEST_MONGODB_URI 
  : process.env.MONGODB_URI 
const PORT = process.env.PORT

module.exports = {mongoUrl,PORT}