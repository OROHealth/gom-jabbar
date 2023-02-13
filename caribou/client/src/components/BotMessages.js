import styled from 'styled-components';

const BotMessages=({botmessages})=>{
    return(
        <Container>
            <MessageUl>
                {botmessages&&botmessages.map((x, index) => (
                        <Message key={index}>{x}</Message>
                ))}
            </MessageUl>
        </Container>
    )
}
export default BotMessages;

const Container= styled.div`
/* border: 1px solid red; */
width: 125px;
display: flex;
flex-direction: row;
justify-content: end;
`
const Message=styled.li`
color:darkgreen;
margin-top: 10px;
color:white;

`
const MessageUl=styled.ul`
list-style: none;
margin-top: 30px;
margin-right:20px;
padding-right: 0;
`