import { toggleImportanceOf } from './reducers/noteReducer'
import { useDispatch } from 'react-redux'
import NewNote from './components/NewNote'
import NoteList from './components/NoteList'

const App = () => {
  return (
    <div>
      <NewNote />
      <NoteList />
    </div>
  )
}

export default App