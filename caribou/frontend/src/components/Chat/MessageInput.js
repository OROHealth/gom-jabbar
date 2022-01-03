import React from 'react';
import "./ChatStyle.css";
const messageInput = () => {
    return (
        <div className="input">
          <input type="text" placeholder="Type a message..." />
          <button type="submit">📨</button>
      </div>
    )
}

export default messageInput
