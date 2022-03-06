const Notification = ({message}) => {
    if (message === null) return null
    const floorStyle = {
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
    return <div style={floorStyle}>{message}</div>
} 

export default Notification