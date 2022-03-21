import {useState} from 'react'

const Blog = ({handleCreate}) => {
  const [title,setTitle] = useState('')
  const [author,setAuthor] = useState('')
  const [url, setUrl] = useState('')
  
  const handleChange = setFunc => {
    return ({target}) => setFunc(target.value)
  }

  const handleSubmit = async e => {
    e.preventDefault()
    
    await handleCreate({author,title,url})
    setAuthor('')
    setTitle('')
    setUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          title: 
          <input 
            type="text" 
            name="Title"
            value={title} 
            // we only want the field/property target
            onChange={handleChange(setTitle)}
          />
        </div>
        <div>
          author: 
          <input 
            type="text" 
            name="Author"
            value={author} 
            // we only want the field/property target
            onChange={handleChange(setAuthor)}
          />
        </div>
        <div>
          url: 
          <input 
            type="text" 
            name="Url"
            value={url} 
            // we only want the field/property target
            onChange={handleChange(setUrl)}
          />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default Blog