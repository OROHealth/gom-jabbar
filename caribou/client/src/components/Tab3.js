import {BiCurrentLocation} from "react-icons/bi";
import styled from "styled-components";
import Chat from "./LiveChat/Chat";

const Tab3 =({coordinates,addAntlers})=>{

    return(
        <Container>
            <StyledH3>Add a Caribou</StyledH3>
            <SmallContainer>
                <label><BiCurrentLocation/>Click on Map to Get Coordinates</label>
                <StyledInput value={`${coordinates.lat},${coordinates.lng}`}></StyledInput>
                <button onClick={()=> addAntlers(coordinates)} >Add Caribou</button>
                <Chat/>
            </SmallContainer>
        </Container>
    )
}

export default Tab3;
const Container=styled.div`
`
const StyledH3=styled.h3`
margin-left: 30px;
`
const SmallContainer=styled.div`
display:flex;
flex-direction: column;
align-items: center;
justify-content: center;
`
const StyledInput=styled.input`
width:250px;
`