import React from 'react';
import Feed from "./Feed";
import Inbox from "./inbox"
import "./ChatStyle.css"
import AntlerExchange from './AntlerExchange';

const Chat = () => {
    return (
        <div className="chat">
            <AntlerExchange/>
            <Inbox/>
            <Feed/>
        </div>
    )
}

export default Chat;
