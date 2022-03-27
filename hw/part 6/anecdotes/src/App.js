import { useSelector, useDispatch } from 'react-redux'
import { addVote } from './reducers/anecdoteReducer'
import AnecForm from './components/AnecdoteForm'
import AnecList from './components/AnecdoteList'

const App = () => {
  return (
    <div>
      <AnecList />
      <AnecForm />
    </div>
  )
}

export default App