const mongoose = require("mongoose")
const app = require("../app")
const supertest = require("supertest")
const api = supertest(app)
const Blog = require("../models/blogs")
const helper = require("./test_helper")



//clear testing db and insert the sample we want to test on
beforeEach(async () => {
  await Blog.deleteMany({})
  console.log("database cleared")
  const blogObject = helper.initialBlogs.map(ele => new Blog(ele).save())
  //do we need to store a noteObjects arr for each ele first
  //then save them?? or can we save them while creating the instance/document?
  // const promiseArr = blogObject.map(note => note.save())
  await Promise.all(blogObject)
  console.log("database initialized")
})

describe("GET method", () => {
  test("the returned is json", async () => {
    await api.get("/api/blogs")
      .expect(200)
      .expect("Content-type",/application\/json/)
    //why chaining here? why not the synchronous syntax?
    //expect(blogs.status).toBe(200)
  })

  test("two blogs in total", async () => {
    const res = await api.get("/api/blogs")
    expect(res.body).toHaveLength(helper.initialBlogs.length)
  })

  test("_id property is parsed into id", async () => {
    const res = await api.get("/api/blogs")
    expect(res.body[0].id).toBeDefined()
  })
})

describe("POST method", () => {
  //1. post operation successful
  //2. posted content is corrected
  test("posted a new entry", async () => {
    const blog = {
      title: "Notes on Crisis",
      author: "Nathan Tankus",
      url: "https://www.crisesnotes.com/",
      likes: 96
    }

    //why is there a content type for the returned of a post action?
    await api.post("/api/blogs")
      .send(blog)
      .expect(201)
      .expect("Content-type",/application\/json/)

    let blogsAtEnd = await helper.blogsInDB()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length+1)
    blogsAtEnd = blogsAtEnd.map(blog => {
      delete blog.id
      return blog
    })
    expect(blogsAtEnd).toContainEqual(blog)
  },100000)

  test("missing likes dafualt to 0", async () => {
    const badBlog = {
      title: "Notes on Crisis",
      author: "Nathan Tankus",
      url: "https://www.crisesnotes.com/"
    }

    await api.post("/api/blogs")
      .send(badBlog)
      .expect(201)
      .expect("Content-type",/application\/json/)

    let blogsAtEnd = await helper.blogsInDB()
    expect(blogsAtEnd[blogsAtEnd.length-1].likes).toBe(0)
  })

  test("missing title evokes 404", async () => {
    const badBlog = {
      author: "Nathan Tankus",
      url: "https://www.crisesnotes.com/",
      likes: 18
    }

    await api.post("/api/blogs")
      .send(badBlog)
      .expect(400)
  })

  test("missing url evokes 404", async () => {
    const badBlog = {
      title: "Notes on Crisis",
      author: "Nathan Tankus",
      likes: 18
    }

    await api.post("/api/blogs")
      .send(badBlog)
      .expect(400)
  })
})

describe("DELETE method", () => {
  //retrieve the first entry and try to delete it
  test("an entry can be deleted", async () => {
    //1. successful deletion
    //2. the remaing entries are the correct ones
    let blogsAtEnd = await helper.blogsInDB()
    const blogToBeDeleted = blogsAtEnd[0]
    await api.delete(`/api/blogs/${blogToBeDeleted.id}`)
      .expect(204)

    blogsAtEnd = await helper.blogsInDB()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length-1)
    expect(blogsAtEnd).not.toContainEqual(blogToBeDeleted)
  })
})

//close the testing db 
afterAll(() => {
  mongoose.connection.close()
}) 