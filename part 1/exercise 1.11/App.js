import {useState} from 'react'

const Button = ({onClick,text}) => {
  return (
    <>
      <button onClick={onClick}>{text}</button>
    </>
  )
}

const Line = ({text,stats}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{stats}</td>
    </tr>
  )
}

const AllStats = ({good,neutral,bad}) => {
  let sum = good+neutral+bad
  if (sum>0) {
    return (
      <table>
        <Line text='good' stats={good} />
        <Line text='neutral' stats={neutral} />
        <Line text='bad' stats={bad} />
        <Line text='all' stats={sum}  />
        <Line text='average' stats={sum/3} />
        <Line text='positive' stats={(good/sum)*100+"%"} />
      </table>
    )
  } 
  return (
    <div>
      <h5>no feedback given</h5>
    </div>
  )
  
}

const App = () => {
  const [good,setGood] = useState(0) 
  const [neutral,setNeutral] = useState(0) 
  const [bad,setBad] = useState(0) 

  const handleClick = (state,setState) => () => setState(state+1)

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleClick(good,setGood)} text='good'/>
      <Button onClick={handleClick(neutral,setNeutral)} text='neutral'/>
      <Button onClick={handleClick(bad,setBad)} text='bad'/>
      <h2>statistics</h2>
      <AllStats good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App;
