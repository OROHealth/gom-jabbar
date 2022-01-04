import React from 'react'
import Message from "./Message"
import "./ChatStyle.css"
import MessageInput from "./MessageInput";
const Feed = () => {
    return (
        <div className="feed">

            <div className="messages">
                <Message message="first message" sent="true" />
                <Message message="second message" />
                <Message message="third message" />
                <Message message="fourth message" sent="true" />
                <Message message="fifth message" sent="true" />
                <Message message="sixth message" />
                <Message message="seventh message" />
                <Message message="eigth message" />
                <Message message="make the scroll bar appear" sent="true" />
                <Message message="make the scroll bar appear" />
                <Message message="make the scroll bar appear" />
                <Message message="make the scroll bar appear" />
                <Message message="make the scroll bar appear" />
                <Message message="make the scroll bar appear" />
                <Message message="make the scroll bar appear" />
                <Message message="make the scroll bar appear" />
                <Message message="make the scroll bar appear" />
                <Message message="make the scroll bar appear" />
                <Message message="make the scroll bar appear" />
                <Message message="make the scroll bar appear" />
                <Message message="make the scroll bar appear" />
                <Message message="make the scroll bar appear" />
            </div>

            <MessageInput/>
         
        </div>
    )
}

export default Feed;
