import Note from './components/Note'
import { useState, useEffect } from 'react'
import noteService from './services/notes'
import Notification from './components/Notification'
import Footer from './components/Footer'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('a new note...')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState('some error happened...')

  //effect/ the function will be executed after App is rendered
  useEffect(() => {
    noteService.getAll()
    .then(data => {
      setNotes(data)
    })
  }, [])

  const notesToShow = showAll ?
    notes 
    : notes.filter(ele => ele.important)
  console.log('notesToShow: ',notesToShow)
  const addNote = (event) => {
    event.preventDefault() //prevent the page from reloading, as most events natrually cause
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() <0.5,
    } //the system will automatically generate the id for each note
    
    noteService
      .create(noteObject)    
      .then(data => {
        setNotes(notes.concat(data))
        setNewNote('')
      })
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }
  //to change the importance of the said note
  const toggleImportanceOf = (id) => {
    const note = notes.find(ele => ele.id === id)
    const changedNote = {...note, important: !note.important}
    noteService
      .update(id,changedNote)
      .then(data => {
        setNotes(notes.map(ele => ele.id === id? data : ele))
      })
      .catch(() => {      
        setErrorMessage(
          `the note '${note.content}' was already deleted from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        },5000)
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage}/> <br />
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note => 
          <Note 
            key={note.id} 
            note={note} 
            toggleImportance = {() => toggleImportanceOf(note.id)}  
          />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange}/>
        <button type='submit'>save</button>
      </form>
      <Footer />
    </div>
  )
}

export default App