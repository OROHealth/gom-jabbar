import styled from "styled-components";
import Eye from "../images/Eye.png"


//Loading Page 
const Loading=()=>{
    return (
    <Container>
        <StyledDiv><img src={Eye}></img></StyledDiv>
    </Container>
    )
}
export default Loading;

const StyledDiv=styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
color: #abc4ff;
animation: StyledDiv 2s infinite ease;

@keyframes StyledDiv {
    0%{transform:rotate(0deg);}
    25%{transform:rotate(180deg);}
    50%{transform:rotate(180deg);}
    75%{transform:rotate(180deg);}
    100%{transform:rotate(180deg);}
}
`
const Container=styled.div`
display: flex;
flex-direction: row;
justify-content: center;
height:800px;
width:80vw;
padding-left: 120px;

`