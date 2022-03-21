import { useState } from "react";

const Toggable = (props) => {
    const [visible, setVisible] = useState(false)

    const showWhenVisible = {display: visible? "" : "none"}
    const hideWhenVisible = {display: visible? "none" : ""}
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

export default Toggable