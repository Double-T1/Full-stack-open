import React from "react"

const Notification = ({message, type}) => {
    if (message === null) return null
    const style = {
        color: 'green',
        backgroundColor: 'lightGrey',
        fontSize: 20,
        padding: 20,
        marginBottom: 10,
        borderColor: 'green',
        borderWidth: 'thick',
        borderStyle: 'solid',
        borderRadius: 15
    }
    if (type === 'login') {
        style.color = style.borderColor = 'red'
    }

    return (
        <div style={style}>
            {message}
        </div>
    )
}


export default Notification