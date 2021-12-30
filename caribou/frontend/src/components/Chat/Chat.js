import React from 'react';
import Feed from "./Feed";
import Inbox from "./inbox"
import "./ChatStyle.css"

const Chat = () => {
    return (
        <div className="chat">
            <div>This is going to be the antler exchange menu </div>
            <Inbox/>
            <Feed/>
        </div>
    )
}

export default Chat;
