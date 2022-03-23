import { useState } from 'react'

const BlogList = ({ user,blog,handleLike,handleRemove }) => {
  const [view, setView] = useState(false)
  const [buttonLabel, setButtonLabel] = useState('view')

  const showWhenView = { display: view? '' : 'none' }
  const handleView = () => {
    let label = !view? 'hide' : 'view'
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

  const removeBlog = async e => {
    e.preventDefault()

    const result = window.confirm(`do you want to delete ${blog.title} by ${blog.author}?`)
    if (result) {
      await handleRemove({
        id: blog.id,
        title: blog.title,
        author: blog.author
      })
    }

  }

  const showIfOwener = {
    display: user && blog.user.id === user.id? '' : 'none',
    fontColor: 'white',
    backgroundColor: 'orange'
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
      <div className='permanent'>
        {blog.title} {blog.author}
        <button onClick={handleView}>{buttonLabel}</button>
      </div>
      <div style={showWhenView} className='temp'>
        {blog.url} <br />
        {blog.likes} <button onClick={changeLikes}>like</button> <br />
        {blog.user.name} <br />
        <button style={showIfOwener} onClick={removeBlog}>remove this blog</button>
      </div>
    </div>
  )
}

const Blogs = ({ user,blogs, handleLike,handleRemove }) => {
  //insanely inefficient => sorting everytime we rerenders
  blogs = [...blogs].sort((a,b) => a.likes-b.likes)

  return (
    <div key="blogsInfo">
      <h2>logged blogs</h2>
      {blogs.map(blog =>
        <BlogList
          key={blog.id}
          user={user}
          blog={blog}
          handleLike={handleLike}
          handleRemove={handleRemove}
        />
      )}
    </div>
  )
}

export default Blogs
