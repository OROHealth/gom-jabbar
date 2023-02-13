import styled from 'styled-components';

const Messages=({messages})=>{
    return(
        <Container>
            <MessageUl>
                {messages.map((x, index) => (
                        <Message key={index}>{x}</Message>
                ))}
            </MessageUl>
        </Container>
    )
}
export default Messages;

const Container= styled.div`
/* border: 1px solid red; */
width:125px;
display: flex;
flex-direction: row;
justify-content: start;

`
const Message=styled.li`
color:darkgreen;
margin-top: 10px;
`
const MessageUl=styled.ul`
list-style: none;
margin-left: 20px;
padding-left: 0;
`