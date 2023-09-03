import React from 'react'
import './message.css'
const Message = ({ message, classs, user }) => {
    return (
        <div className={`message-box ${classs}`}>
            {user}:{message}
        </div>
    )
}

export default Message
