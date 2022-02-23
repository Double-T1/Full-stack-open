const Form = ({newName,newNumber,handleNameChange,handleNumChange,handleClick}) => {
    return (
      <>
        <h2>add a new</h2>
        <form>
          <div>
            name: <input value={newName} onChange={handleNameChange}/>
          </div>
          <div>
            number: <input value={newNumber} onChange={handleNumChange}/>
          </div>
          <div>
            <button type="submit" onClick={handleClick}>add</button>
          </div>
        </form>
      </>
    )
}

export default Form