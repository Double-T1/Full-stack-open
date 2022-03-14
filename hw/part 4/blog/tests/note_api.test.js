const mongoose = require("mongoose")
const app = require("../app")
const supertest = require("supertest")
const api = supertest(app)
const Blog = require("../models/blogs")

const initialBlogs = [
  {
    title: "2ality",
    author: "Dr. Axel Rauschmayer",
    url: "https://2ality.com/",
    likes: 17
  }, {
    title: "Daily Dev Tips",
    author: "Chris Bongers",
    url: "https://daily-dev-tips.com/",
    likes: 69
  }
]

//clear testing db and insert the sample we want to test on
beforeEach(async () => {
  await Blog.deleteMany({})
  console.log("database cleared")
  const promiseArr = initialBlogs.map(ele => new Blog(ele).save())
  //do we need to store a noteObjects arr for each ele first
  //then save them?? or can we save them while creating the instance/document?
  //const promiseArray = noteObjects.map(note => note.save())
  await Promise.all(promiseArr)
  console.log("database initialized")
})


describe("GET method", () => {
  test("the blogList should have 2 elements.", async () => {
    console.log("test started")
    const res = await api.get({})
    console.log("data retrieved", res)
  }, 100000)
})



//close the testing db 
afterAll(() => {
  mongoose.connection.close()
}) 