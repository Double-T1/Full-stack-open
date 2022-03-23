import { useState } from 'react'
import Notification from './Notificaiton'

const LoginForm = ({ handleLogin,message }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()
    console.log(`logging in with ${username} ${password}`)

    await handleLogin({ username,password })
    setPassword('')
    setUsername('')
  }

  return (
    <div>
      <h2>log in to application</h2>
      <Notification message={message} type="login"/>
      <form onSubmit={handleSubmit}>
        <div>
                    username:
          <input
            type="text"
            name="Username"
            value={username}
            // we only want the field/property target
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
                    password:
          <input
            type="password"
            name="Password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        {/* a submit type button delegate its function to its parent */}
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default LoginForm

