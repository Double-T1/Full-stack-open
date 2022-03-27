import { useDispatch } from "react-redux"
import { createAnec } from "../reducers/anecdoteReducer"


const AnecForm = () => {
  const dispatch = useDispatch()

  const handleSubmit = e => {
    e.preventDefault()
    const content = e.target.anec.value
    e.target.anec.value = ''
    dispatch(createAnec(content))
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div><input name='anec'/></div>
        <button type='submit'>create</button>
      </form>
    </>
  )
}


export default AnecForm