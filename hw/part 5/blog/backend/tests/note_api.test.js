const mongoose = require("mongoose")
const app = require("../app")
const supertest = require("supertest")
const api = supertest(app)
const Blog = require("../models/blogs")
const User = require("../models/users")
const helper = require("./test_helper")

//0. clean the user database
//1. create a user
//2. log in to get token
//3. set the user property of the blogs 
beforeEach(async () => {
  const user = helper.initialUsers[0]
  await User.deleteMany({})
  await api.post("/api/users")
    .send(user)
  console.log("userDB set")

  const result = await api
    .post("/api/login")
    .send({username: user.username, password: user.password})
  const token = result.body.token, id = result.body.id
  console.log("login successful and token retrieved")

  await Blog.deleteMany({})
  const blogObject = helper.initialBlogs.map(ele => {
    ele.user = id
    return new Blog(ele)
      .set("Authorization",`bearer ${token}`)  
      .save()
  })
  await Promise.all(blogObject)
  console.log("blogDB set")
})

describe("GET method", () => {
  test("status 200 for getting the main entries", async () => {
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
    const user = helper.initialUsers[0]
    const result = await api
      .post("/api/login")
      .send({username: user.username, password: user.password})
    const token = result.body.token
    const blog = {
      title: "Notes on Crisis",
      author: "Nathan Tankus",
      url: "https://www.crisesnotes.com/",
      likes: 96
    }

    //why is there a content type for the returned of a post action?
    await api.post("/api/blogs")
      .auth(token, {type: "bearer"})
      .send(blog)
      .expect(201)
      .expect("Content-type",/application\/json/)

    let blogsAtEnd = await helper.blogsInDB()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length+1)
    blogsAtEnd = blogsAtEnd.map(blog => {
      delete blog.id
      delete blog.user
      return blog
    })
    expect(blogsAtEnd).toContainEqual(blog)
  },100000)

  test("missing likes dafualt to 0", async () => {
    const user = helper.initialUsers[0]
    const result = await api
      .post("/api/login")
      .send({username: user.username, password: user.password})
    const token = result.body.token

    const badBlog = {
      title: "Notes on Crisis",
      author: "Nathan Tankus",
      url: "https://www.crisesnotes.com/"
    }

    await api.post("/api/blogs")
      .auth(token, {type: "bearer"})
      .send(badBlog)
      .expect(201)
      .expect("Content-type",/application\/json/)

    let blogsAtEnd = await helper.blogsInDB()
    expect(blogsAtEnd[blogsAtEnd.length-1].likes).toBe(0)
  })

  test("missing title evokes 400", async () => {
    const user = helper.initialUsers[0]
    const result = await api
      .post("/api/login")
      .send({username: user.username, password: user.password})
    const token = result.body.token

    const badBlog = {
      author: "Nathan Tankus",
      url: "https://www.crisesnotes.com/",
      likes: 18
    }

    await api.post("/api/blogs")
      .auth(token, {type: "bearer"})
      .send(badBlog)
      .expect(400)
  })

  test("missing url evokes 400", async () => {
    const user = helper.initialUsers[0]
    const result = await api
      .post("/api/login")
      .send({username: user.username, password: user.password})
    const token = result.body.token

    const badBlog = {
      title: "Notes on Crisis",
      author: "Nathan Tankus",
      likes: 18
    }

    await api.post("/api/blogs")
      .auth(token, {type: "bearer"})
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

describe("PUT method", () => {
  //1. status code 2. the entry is added (length and in within)
  test("success with code 204 if id is valid", async () => {
    let blogsAtEnd = await helper.blogsInDB()
    const blogToBeUpdated = blogsAtEnd[0]
    blogToBeUpdated.likes *= 2
    await api.put(`/api/blogs/${blogToBeUpdated.id}`)
      .send(blogToBeUpdated)
      .expect(200)
      .expect("Content-type",/application\/json/)
    
    blogsAtEnd = await helper.blogsInDB()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    expect(blogsAtEnd).toContainEqual(blogToBeUpdated)
  })

  test("error with code 400 if id is invalid", async () => {
    
  })
})

//close the testing db 
afterAll(() => {
  mongoose.connection.close()
}) 