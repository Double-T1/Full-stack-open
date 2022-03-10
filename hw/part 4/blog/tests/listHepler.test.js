const {dummy,totalLikes,favoriteBlog,mostBlogs,mostLikes} = require("../utils/list_helper")

describe("weird ass function dummy",() => {
  test("dummy returns one",() => {
    expect(dummy([1,2,3])).toBe(1)
  })
})

const arr = [
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Road to serfdom",
    author: "Hayek",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 0,
    __v: 0
  }, {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  }, {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 9,
    __v: 0
  }
]

describe("testing function totalLikes",() => {
  test("empty array equals zero",() => {
    expect(totalLikes([])).toBe(0)
  })
  test("one element equals itself",() => {
    expect(totalLikes([arr[1]])).toBe(5)
  })
  test("muliple elements result in sum",() => {
    expect(totalLikes(arr)).toBe(14)
  })
})

describe("testing function favoriteBlog", () => {
  test("empty array return null",() => {
    expect(favoriteBlog([])).toEqual(null)
  })
  test("one element return itself",() => {
    const [title,author,likes] = [arr[0].title,arr[0].author,arr[0].likes]
    expect(favoriteBlog([arr[0]])).toEqual({title,author,likes})
  })
  test("muliple elements result in sum",() => {
    const [title,author,likes] = [arr[2].title,arr[2].author,arr[2].likes]
    expect(favoriteBlog(arr)).toEqual({title,author,likes})
  })
})

describe("testing function mostBlogs", () => {
  test("equal to one author",() => {
    expect(mostBlogs(arr)).toEqual({author: "Edsger W. Dijkstra", blogs: 2})
  })
})

describe("testing function mostLikes", () => {
  test("equal to the likes of one author",() => {
    expect(mostLikes(arr)).toEqual({author: "Edsger W. Dijkstra", likes: 14})
  })
})