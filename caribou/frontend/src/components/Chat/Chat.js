import React from 'react';
import Feed from "./Feed";
import "./ChatStyle.css"
import AntlerExchange from './AntlerExchange';

const Chat = () => {
    return (
        <div className="chat">
            <AntlerExchange/>
            <Feed/>
        </div>
    )
}

export default Chat;
