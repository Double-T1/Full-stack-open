import { useState } from "react"

const BlogList = ({blog,handleLike}) => {
  const [view, setView] = useState(false)
  const [buttonLabel, setButtonLabel] = useState("view")

  const showWhenView = {display: view? "" : "none"}
  const handleView = () => {
    let label = !view? "hide" : "view"
    setButtonLabel(label)
    setView(!view)
  }

  const changeLikes = async e => {
    e.preventDefault()
    const obj = {
      title: blog.title,
      author: blog.author,
      id: blog.id,
      newLikes: blog.likes+1
    }
    await handleLike(obj)
  }

  const style = {
    paddingTop: 5,
    paddingLeft: 5,
    paddingBottom: 5,
    border: 'solid',
    borderWidth: 1, 
    marginBottom: 5
  }

  return (
    <div style={style}>
      <div>
        {blog.title} {blog.author} 
        <button onClick={handleView}>{buttonLabel}</button>
      </div>
      <div style={showWhenView}>
        {blog.url} <br /> 
        {blog.likes} <button onClick={changeLikes}>like</button>
      </div>
    </div>
  )
}

const Blogs = ({blogs, handleLike}) => {
    return (
      <div>
        <h2>logged blogs</h2>
        {blogs.map(blog =>
          <BlogList key={blog.id} blog={blog} handleLike={handleLike}/>
        )}
      </div>
    )
}

export default Blogs
