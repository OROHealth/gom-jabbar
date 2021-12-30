import React from 'react';
import "./ChatStyle.css";
const messageInput = () => {
    return (
        <div className="input">
          <input type="text" placeholder="Type a message..." />
          <button type="submit"><i class="fas fa-paper-plane"></i></button>
      </div>
    )
}

export default messageInput
