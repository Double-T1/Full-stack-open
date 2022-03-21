import React from "react"
import Notification from "./Notificaiton"

const LoginForm = ({username,password,handleLogin,setUsername,setPassword,message}) => {
    return (
        <div>
            <h2>log in to application</h2>
            <Notification message={message} type="login"/>
            <form onSubmit={handleLogin}>
            <div>
                username: 
                <input 
                type="text" 
                name="Username"
                value={username} 
                // we only want the field/property target
                onChange={({target})=> setUsername(target.value)}
                />
            </div>
            <div>
                password: 
                <input 
                type="password"
                name="Password"
                value={password} 
                onChange={({target})=> setPassword(target.value)}
                />
            </div>
            {/* a submit type button delegate its function to its parent */}
            <button type='submit'>login</button>
            </form>
        </div>
    )
}

export default LoginForm

