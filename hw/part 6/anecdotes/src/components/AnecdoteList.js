import { useDispatch, useSelector } from "react-redux"
import { addVote } from "../reducers/anecdoteReducer"

const Anec = ({handleClick,anecdote}) => {
  return (
    <div key={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  )
}

const AnecList = () => {
  const anecdotes = useSelector(state => state).sort((a,b) => a.votes-b.votes)
  const dispatch = useDispatch()

  const vote = id => {
    dispatch(addVote(id))
  }

  return (
    <>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <Anec 
          key={anecdote.id}
          handleClick={() => vote(anecdote.id)} 
          anecdote={anecdote}
        />
      )}
    </>
  )
}


export default AnecList