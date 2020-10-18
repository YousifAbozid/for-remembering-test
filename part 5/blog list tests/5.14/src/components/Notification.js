import React from 'react'

const Notification = ({ message }) => {
    return (
      <div className={message.success ? 'success' : 'failure'}>
        {message.content}
      </div>
    ) 
}

export default Notification