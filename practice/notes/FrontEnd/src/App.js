import { useState, useEffect, useRef } from 'react'

import Note from './components/Note'
import Notification from './components/Notification'
import Footer from './components/Footer'
import Toggable from './components/Toggable'
import LoginForm from './components/LoginForm'
import NoteForm from './components/NoteForm'
import noteService from './services/notes'
import loginService from './services/login'


const App = () => {
  const [notes, setNotes] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [user,setUser] = useState(null)
  const noteFormRef = useRef()

  useEffect(async () => {
    const initialNotes = await noteService.getAll()
    setNotes(initialNotes)
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (userObj) => {
    try {
      const user = await loginService.login(userObj)

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      noteService.setToken(user.token)
      setUser(user)
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async e => {
    e.preventDefault()
    console.log('logging out')

    window.localStorage.removeItem('loggedUser')
    noteService.setToken(null)
    setUser(null)
  }

  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(() => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

  const createNote = async noteObj => {
    noteFormRef.current.toggleVisibility()
    const returnedNote = await noteService.create(noteObj)
    setNotes(notes.concat(returnedNote))
  }

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      {user === null ?
        <Toggable buttonLabel="login">
          <LoginForm
            handleLogin={handleLogin}
          />
        </Toggable> :
        <div>
          <div>
            {user.name} logged in
            <button onClick={handleLogout}>logout</button>
          </div>
          <Toggable buttonLabel="new note" ref={noteFormRef}>
            <NoteForm
              createNote={createNote}
            />
          </Toggable>
        </div>
      }

      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div>
      <ul>
        {notesToShow.map(note =>
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        )}
      </ul>
      <Footer />
    </div>
  )
}

export default App