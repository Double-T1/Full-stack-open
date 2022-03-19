import React from "react"

const LoginNotification = ({errorMessage}) => {
    if (errorMessage === null) return null
    return (
        <div>
            <p>{errorMessage}</p>
        </div>
    )
}


export default LoginNotification