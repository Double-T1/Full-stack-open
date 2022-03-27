const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case 'INCREASE_VOTE': {
      const id = action.data.id
      const voteToUpdate = state.find(a => a.id === id)
      const updatedVote = {
        ...voteToUpdate,
        votes: voteToUpdate.votes+1
      }
      return state.map(ele => ele.id === id ? updatedVote : ele)
    }
    case 'ADD_ANEC': {
      const newAnec = asObject(action.data.content)
      return [...state, newAnec]
    }
    default: return state
  }
}

export const addVote = id => {
  return {
    type: 'INCREASE_VOTE',
    data: { id }
  }
}

export const createAnec = content => {
  return {
    type: 'ADD_ANEC',
    data: { content }
  }
}

export default reducer