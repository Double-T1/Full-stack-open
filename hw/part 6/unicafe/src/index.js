import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const Line = ({text,stats}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{stats}</td>
    </tr>
  )
}

const AllStats = ({state}) => {
  const {good,ok,bad} = state
  let sum = good+ok+bad
  if (sum>0) {
    return (
      <table>
        <tbody>
          <Line text='good' stats={good} />
          <Line text='ok' stats={ok} />
          <Line text='bad' stats={bad} />
          <Line text='all' stats={sum}  />
          <Line text='average' stats={sum/3} />
          <Line text='positive' stats={(good/sum)*100+"%"} />
        </tbody>
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
  const changeGood = () => {
    store.dispatch({
      type: 'GOOD'
    })
  }
  const changeOk = () => {
    store.dispatch({
      type: 'OK'
    })
  }
  const changeBad = () => {
    store.dispatch({
      type: 'BAD'
    })
  }
  const reset = () => {
    store.dispatch({
      type: 'ZERO'
    })
  }

  return (
    <div>
      <h2>provide feedback</h2>
      <button onClick={changeGood}>good</button> 
      <button onClick={changeOk}>ok</button> 
      <button onClick={changeBad}>bad</button>
      <button onClick={reset}>reset stats</button>
      <h2>stats</h2>
      <AllStats state={store.getState()}/>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)