require('dotenv').config() //to be able to parse env file

const mongoUrl = process.env.MONGODB_URI
const PORT = process.env.PORT

module.exports = {mongoUrl,PORT}