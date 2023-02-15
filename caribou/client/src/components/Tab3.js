import {BiCurrentLocation} from "react-icons/bi";
import styled from "styled-components";
import Chat from "./LiveChat/Chat";

const Tab3 =({coordinates,addAntlers})=>{

    return(
        <Container>
            <SmallContainer>
                <Title>Add a Caribou</Title>
                <label><BiCurrentLocation/>Click on Map to Get Coordinates</label>
                <StyledInput value={`${coordinates.lat},${coordinates.lng}`}></StyledInput>
                <StyledButton onClick={()=> addAntlers(coordinates)} >Add Caribou</StyledButton>
            </SmallContainer>
            <Chat/>
        </Container>
    )
}

export default Tab3;
const Container=styled.div`
display: flex;
flex-direction: column;
align-items: center;
`

const SmallContainer=styled.div`
display:flex;
flex-direction: column;
align-items: center;
justify-content: center;
border: 1px solid black;
padding-left: 60px;
padding-right:60px;
margin-top: 10px;
`
const StyledInput=styled.input`
width:250px;
`
const StyledButton=styled.button`
font-size: 20px;
padding:10px;
border-radius: 50px;
border: none;
&:active{
    background-color: grey;
}
margin-top: 10px;
margin-bottom: 10px;
`
const Title=styled.p`
font-size:30px;
margin: 0px;
padding:0px;
`