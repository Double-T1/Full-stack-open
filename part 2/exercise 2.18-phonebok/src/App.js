import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Form from './components/Form'
import Record from './components/Record'
import server from './services/persons'

const App = () => {
  const [persons,setPersons] = useState([])
  const [personToShow, setToShow] = useState(persons)
  const [newName, setNewName] = useState('type a name here')
  const [newNumber, setNewNumber] = useState('00-0000-0000')

  useEffect(() => {
    server.getAll()
      .then(data => {
        setPersons(data)
      })
  },[])

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }
  const handleNumChange = (e) => {
    setNewNumber(e.target.value)
  }
  
  const isRecorded = (persons,name) => {
    for (let p of persons) {
      if (p.name===name) return p.id
    }
    return -1
  }

  const handleClick = (e) => {
    e.preventDefault()
    let id = isRecorded(persons,newName)
    if (id !== -1
      && window.confirm(`${newName} is already in the phonebook, replace the old number with a new numebr?`)
    ) {
      server.update(id,{newName,newNumber})
        .then(data => chainHelp(data))
    } else {
      server.insert({newName, newNumber})
        .then(data => chainHelp(data))
    }
  }

  const chainHelp = (data) => {
    let a = persons.filter(ele => ele.id!==data.id).concat(data)
    setPersons(a)
    setToShow(a)
    setNewName('')
    setNewNumber('')
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

  const handleDelete = (e,id) => {
    e.preventDefault() //every eventual onclick function calls for rerendering automatically when clicked
    server.nullify(id)
      .then(() => {
        setPersons(persons.filter(ele => ele.id !== id))
        setToShow(personToShow.filter(ele => ele.id !== id))
      })
      .catch(error => console.log(error))
  }

  return (
    <div>
      <Filter handleFilter={handleFilter} /> 
      <Form newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumChange={handleNumChange} handleClick={handleClick}/>
      <Record personToShow={personToShow} handleDelete={handleDelete}/>
    </div>
  )
}

export default App