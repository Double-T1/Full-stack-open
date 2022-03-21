import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import loginService from './services/login'
import blogService from './services/blogs'
import LoginForm from './components/Login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title,setTitle] = useState('')
  const [author,setAuthor] = useState('')
  const [url, setUrl] = useState('')
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

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      console.log(`logging in with ${username} ${password}`)
      const user = await loginService.login({username,password})

      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)

      setUser(user)
      setPassword('')
      setUsername('')
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

  const handleCreate = async e => {
    e.preventDefault()
    console.log("creating a new blog")

    const addedBlog = await blogService.addOne({author, title, url})

    setMessage(`a new blog ${title} by ${author} is added`)
    setTimeout(() => {
      setMessage(null)
    }, 5000)

    const newBlogList = blogs.concat(addedBlog)
    setBlogs(newBlogList)
    setAuthor('')
    setTitle('')
    setUrl('')
  }

  const handleClearAll = async e => {
    e.preventDefault()
    await blogService.clearAll()
    setBlogs([])
  }

  return (
    <div>
      {user === null?
        <LoginForm 
          username={username} 
          password={password}  
          handleLogin={handleLogin}
          setUsername={setUsername}
          setPassword={setPassword}
          message={message}
        /> :
        <>
          <button onClick={handleClearAll}>
            clear all blogs
            (dev only)
          </button>
          <Blog 
            user={user}
            handleLogout={handleLogout}
            title={title}
            setTitle={setTitle}
            author={author}
            setAuthor={setAuthor}
            url={url}
            setUrl={setUrl}
            handleCreate={handleCreate}
            blogs={blogs}
            message={message}
          />
        </>
      }
    </div>
  )
}

export default App