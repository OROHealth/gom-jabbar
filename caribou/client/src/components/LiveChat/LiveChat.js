import styled from "styled-components";
import {IoMdSend} from 'react-icons/io';
import { useEffect, useState } from "react";

const LiveChat=({socket,username,room,setShowChat})=>{
    const[currentMessage,setCurrentMessage]=useState("");
    const[messageList,setMessageList]=useState([]);
    const [flag,setFlag]=useState(false);   

    //function changes message to caribou algorithm ,organises the data, and sends emit to backend
    const sendMessage= async()=>{
        if(currentMessage!=''){
            const newMsg=currentMessage.split("").map((char) =>
        /[aeiouAEIOU]/.test(char) ? "muu" : "grm").join("");
            const messageData ={
                room:room,
                author:username,
                message:newMsg,
                time:new Date(Date.now()).getHours()+ ":" + new Date(Date.now()).getMinutes()
            };
            await socket.emit("send_message",messageData);
        }
    }

    //function to close Chat
    const closeChat=()=>{
        setShowChat(true);
        setMessageList([]);
    }

    // useEffect to receive messages
    useEffect(()=>{
        socket.on("receive_message",(data)=>{
            setMessageList((list)=>[...list,data])
        })
    },[socket])

    return(
    <ChatContainer>
        <ChatHeader>
            <p>LiveChat</p>
            <CloseButton onClick={()=>closeChat()}>x</CloseButton>
        </ChatHeader>
        <ChatBody>
            {messageList.map((message)=>{
                if(username===message.username){
                    setFlag(true);
                }
                return (
                    <div>
                        <MessageBubble style={{backgroundColor:flag ?"lightgreen": "lightblue"}}>
                            <p>{message.message}</p>
                        </MessageBubble>
                        <MetaDiv>
                            <StyledP>{message.time}</StyledP>
                            <StyledP>{message.author}</StyledP>
                        </MetaDiv>                
                    </div>
                )
            })}
        </ChatBody>
        <ChatFooter>
            <StyledInput     
                type="text" 
                placeholder="Hey..."
                onChange={(e)=>{
                    setCurrentMessage(e.target.value);
                }}
                onKeyPress={(e)=>{e.key=="enter"&& sendMessage()}}
            ></StyledInput>
            <StyledButton onClick={sendMessage}><IoMdSend/></StyledButton>
        </ChatFooter>
    </ChatContainer>
    )
}
const ChatHeader=styled.div`
color:white;
background-color: black;
display: flex;
flex-direction: row;
justify-content: space-between;
`
const ChatBody=styled.div`
border: 1px solid black;
height:310px;
overflow-y: scroll;
padding-left: 5px;
padding-right: 5px;
`
const ChatFooter=styled.div`
display: flex;
flex-direction: row;
justify-content: center;
`
const ChatContainer=styled.div`
display: flex;
flex-direction: column;
border: 1px solid black;
height: 400px;
width: 300px;
top:-30px;
position:relative;
`
const StyledInput=styled.input`
width: 265px;
height: 40px;
border: none;
`
const StyledButton=styled.button`
background-color: white;
border: none;
`
const MessageBubble=styled.div`
padding-top:1px;
padding-bottom:1px;
display: flex;
flex-direction:column;
justify-content: center;
align-items: center;
width:150px;
border-radius: 10px;
`
const MetaDiv=styled.div`
display: flex;
flex-direction: row;
justify-content: start;
font-size: 10px;

`
const StyledP=styled.p`
margin:0;
margin-right:5px;
:nth-child(2){
    font-weight: bold;
}
`
const CloseButton=styled.button`
border: none;
color: white;
background-color: transparent;
font-size: 30px;
`
export default LiveChat;