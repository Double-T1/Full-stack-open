import ReactDOM from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from '.'
import noteReducer from './reducers/noteReducer'

const store = createStore(noteReducer)

ReactDOM.render(
  <Provider store={store}>    
    <App />
  </Provider>,  
  document.getElementById('root')
)