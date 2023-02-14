import styled from "styled-components";
import {IoMdSend} from 'react-icons/io';
import { useState } from "react";
import Messages from "./Messages";
import BotMessages from "./BotMessages";
const LiveChat=({setOpen,open})=>{
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState([]);
    const [botmessages,setBotMessages]=useState([])
    const[randomIdx,setRandomIdx]=useState();
    const [botMessage,setBotMessage]=useState([]);
    const msgBank=['grmmuu','grmgrmmuu','grmmuu','grmmuugrm'];


    const randomMessage=()=>{
        setBotMessages([...botmessages,(msgBank[Math.floor(Math.random() * msgBank.length)])]);
    }

    const submitMessage = (e) => {
        e.preventDefault();
        const newMsg=message.split("").map((char) =>
        /[aeiouAEIOU]/.test(char) ? "muu" : "grm").join("");

        setMessages([...messages, newMsg]);
        setMessage('');
        setTimeout(() => {
            randomMessage();
        }, 3000);
        
    };

    return(
        <div>
        {(open==true)&&<Container>
            <ChatDisplay>
                <Header><CloseButton onClick={()=>setOpen(false)}>x</CloseButton></Header>
                <MessagesDiv>
                    <Messages messages={messages}/>
                    <BotMessages botmessages={botmessages}/>
                </MessagesDiv>
            </ChatDisplay>
            <inputDiv>
            <form onSubmit={submitMessage}>
                <StyledInput type='text' value={message}onChange={(e) => setMessage(e.target.value)}></StyledInput>
                <StyledButton><IoMdSend/></StyledButton>
            </form>
            </inputDiv>
        </Container>}
        </div>
    )
}
export default LiveChat;

const Container=styled.div`
background-color: white;
position: absolute;
top:460px;
left:1180px;
height:330px;
width:250px;
display: flex;
flex-direction: column;
`
const inputDiv=styled.div`
height:25px;
width:250px;
border: 1px solid grey;
display: flex;
flex-direction: row;
`
const StyledInput=styled.input`
width:212px;
height:25px;
border: none;
`
const StyledButton=styled.button`
height:30px;
background-color: white;
border: none;
`
const ChatDisplay=styled.div`
height:300px;
width:250px;
background-color: black;
`
const Message=styled.li`
color:darkgreen;

`
const BotMessage=styled.p`
color:white;
`

const Header=styled.div`
display:flex;
flex-direction: row;
justify-content: end;
`
const CloseButton=styled.button`
background-color: black;
color: white;
border: none;
`
const MessagesDiv=styled.div`
display:flex;
flex-direction: row;
justify-content: space-between;
`