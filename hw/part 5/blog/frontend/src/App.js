import React, { useState, useEffect } from 'react'
import BlogForm from './components/BlogForm'
import loginService from './services/login'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import Toggable from './components/Toggable'
import Blogs from "./components/Blogs"
import UserSession from "./components/UserSession"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message,setMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async ({username,password}) => {
    try {
      const user = await loginService.login({username,password})

      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)

      setUser(user)
    } catch (e) {
      console.log("error")
      setMessage("wrong username or password")
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
    
  }

  const handleLogout = async e => {
    e.preventDefault()
    console.log("logging out")
    
    window.localStorage.removeItem('loggedUser')
    blogService.setToken(null)

    setUser(null)
  } 

  const handleCreate = async ({author,title,url}) => {
    try {
      const addedBlog = await blogService.addOne({author, title, url})

      setMessage(`a new blog ${title} by ${author} is added`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)

      const newBlogList = blogs.concat(addedBlog)
      setBlogs(newBlogList)
    } catch (e) {
      console.log(e)
      setMessage(e)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLike = async ({title,author,id,newLikes}) => {
    try {
      console.log('start updating')
      const updatedBlog = await blogService.updateLikes({id,newLikes})

      setMessage(`blog ${title} by ${author} is updated`)
      setTimeout(() => {
        setMessage(null)
      }, 1000)

      const newBlogList = blogs.concat(updatedBlog)
      setBlogs(newBlogList)
    } catch (e) {
      console.log(e)
      setMessage(e)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleClearAll = async e => {
    e.preventDefault()
    await blogService.clearAll()
    setBlogs([])
  }

  return (
    <div>
      {user === null?
        <Toggable buttonLabel="login">
          <LoginForm   
            handleLogin={handleLogin}
            message={message}
          />
        </Toggable>
         :
        <>
          <button onClick={handleClearAll}>
            clear all blogs
            (dev only)
          </button> 
          <UserSession 
            message={message}
            handleLogout={handleLogout}
            user={user}
          />
          <br />
          <Toggable buttonLabel="create new blog">
            <BlogForm handleCreate={handleCreate}/>
          </Toggable>
        </>
      }

      <div>
        <Blogs blogs={blogs} handleLike={handleLike}/>
      </div>
    </div>
  )
}

export default App