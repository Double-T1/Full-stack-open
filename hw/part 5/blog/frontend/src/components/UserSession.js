import Notification from "./Notificaiton"

const UserSession = ({message,user,handleLogout}) => {
    return (
        <div>
          <h2>blogs</h2>
          <Notification message={message} type="blog"/>
          <div>
            {user.name} logged in
            <button onClick={handleLogout}>logout</button>
          </div> 
        </div>
    )
}


export default UserSession