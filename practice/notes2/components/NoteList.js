import { useSelector, useDispatch } from "react-redux"
import { toggleImportanceOf } from "../reducers/noteReducers"

const Note = ({note, handleClick}) => {
  return (
    <li
      key={note.id} 
      onClick={handleClick}
    >
      {note.content} <strong>{note.important ? 'important' : ''}</strong>
    </li>
  )
}

const NoteList = () => {
  const notes = useSelector(state => state)
  const dispatch = useDispatch()  
  
  const toggleImportance = (id) => {
    dispatch(toggleImportanceOf(id))  
  }

  return (
    <ul>
      {notes.map(note =>          
        <Note 
          key={note.id}
          note={note} 
          handleClick={() => toggleImportance(note.id)}  
        />
      )}
    </ul>
  )
}

export default NoteList