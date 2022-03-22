import { useState } from 'react'
import PropTypes from 'prop-types'

const Toggable = (props) => {
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible? '' : 'none' }
  const hideWhenVisible = { display: visible? 'none' : '' }
  const changeVisible = () => {
    setVisible(!visible)
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={changeVisible}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={changeVisible}>cancel</button>
      </div>
    </div>
  )
}

Toggable.displayName = 'Toggable'

Toggable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Toggable