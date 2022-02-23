import { useState } from 'react'

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

const Record = ({personToShow}) => {
  return (
    <>
      <h2>Numbers</h2>
      {personToShow.map(ele=> <Log key={ele.id} p={ele}/>)}
    </>
  )
}

const Log = ({p}) => {
  return (
    <p>{p.name} {p.number}</p>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [personToShow, setToShow] = useState(persons)
  const [newName, setNewName] = useState('type a name here')
  const [newNumber, setNewNumber] = useState('00-0000-0000')

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }
  const handleNumChange = (e) => {
    setNewNumber(e.target.value)
  }
  
  const isRecorded = (persons,name) => {
    for (let p of persons) {
      if (p.name===name) return true
    }
    return false
  }

  const handleClick = (e) => {
    e.preventDefault()
    if (isRecorded(persons,newName)) {
      window.alert(`${newName} is already in the phonebook`)
    } else {
      let newObj = {
        name: newName,
        number: newNumber,
        id: persons.length+1
      }
      let a = persons.concat(newObj)
      setPersons(a)
      setToShow(a)
      setNewName('')
      setNewNumber('')
    }
  }

  const handleFilter = (e) => {
    let name = e.target.value.toLowerCase()
    if (name === '') {
      setToShow(persons)
    } else {
      let arr = persons.filter(p => {
        return p.name.toLowerCase().indexOf(name) === 0
      })
      setToShow(arr)
    }
  }

  return (
    <div>
      <Filter handleFilter={handleFilter} /> 
      <Form newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumChange={handleNumChange} handleClick={handleClick}/>
      <Record personToShow={personToShow}/>
    </div>
  )
}

export default App