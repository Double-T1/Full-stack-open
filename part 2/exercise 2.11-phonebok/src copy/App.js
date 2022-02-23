import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Form from './components/Form'
import Record from './components/Record'

const App = () => {
  const [persons,setPersons] = useState([])
  const [personToShow, setToShow] = useState(persons)
  const [newName, setNewName] = useState('type a name here')
  const [newNumber, setNewNumber] = useState('00-0000-0000')

  useEffect(() => {
    axios.get('http://localhost:3001/persons')
      .then(res => {
        setPersons(res.data)
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