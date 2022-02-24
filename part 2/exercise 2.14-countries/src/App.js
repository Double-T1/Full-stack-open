import { useState, useEffect } from "react"
import axios from 'axios'
import Info from './components/Info'
import Filter from './components/Filter'



const App = () => {
  const [countries, setCounties] = useState([])
  const [countriesToShow, setToShow] = useState([])

  //the name we want : res.data[1].name.common
  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
      .then(res => {
        setCounties(res.data)
      })
  },[])

  const onChange = (e) => {
    let str = e.target.value
    if (str === '') {
      setToShow([])
    } else {
      let x = countries.filter(ele => ele.name.common.toLowerCase().includes(str))
      setToShow(x)
    }
  }

  return (
    <div>
      <h1>Country Info</h1>
      <Filter onChange={onChange} />
      <Info countriesToShow={countriesToShow} setToShow={setToShow}/>
    </div>
  )
}

export default App