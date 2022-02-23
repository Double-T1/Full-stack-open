const Filter = ({handleFilter}) => {
    return (
      <>
        <h2>Phonebook</h2>
        <div>
          filter shown with <input onChange={handleFilter}></input>
        </div>
      </>
    )
}

export default Filter