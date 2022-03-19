import React from 'react'

const BlogList = ({blog}) => (
  <div>
    {blog.title} {blog.author}
  </div>  
)

const Blog = ({user,handleLogout,title,setTitle,author,setAuthor,url,setUrl,handleCreate,blogs}) => {
  const userSession = () => {
    return (
      <>
        <h2>blogs</h2>
        <div>
          {user.name} logged in
          <button onClick={handleLogout}>logout</button>
        </div> 
      </>
    )
  }

  const addBlogForm = () => {
    return (
      <div>
        <h2>create new</h2>
        <form>
          <div>
            title: 
            <input 
              type="text" 
              name="Title"
              value={title} 
              // we only want the field/property target
              onChange={({target})=> setTitle(target.value)}
            />
          </div>
          <div>
            author: 
            <input 
              type="text" 
              name="Author"
              value={author} 
              // we only want the field/property target
              onChange={({target})=> setAuthor(target.value)}
            />
          </div>
          <div>
            url: 
            <input 
              type="text" 
              name="Url"
              value={url} 
              // we only want the field/property target
              onChange={({target})=> setUrl(target.value)}
            />
          </div>
          <button onClick={handleCreate}>create</button>
        </form>
      </div>
    )
  }

  const blogsList = () => {
    return (
      <div>
        <h2>logged blogs</h2>
        {blogs.map(blog =>
          <BlogList key={blog.id} blog={blog} />
        )}
      </div>
    )
  }

  return (
    <>
      {userSession()}
      {addBlogForm()}
      {blogsList()}
    </>
  )
}

export default Blog