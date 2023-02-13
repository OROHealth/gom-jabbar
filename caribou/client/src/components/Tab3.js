import {BiCurrentLocation} from "react-icons/bi";
import styled from "styled-components";

const Tab1 =({coordinates,addAntlers})=>{


    return(
        <SmallContainer>
            <label><BiCurrentLocation/>Click on Map to Get Coordinates</label>
            <StyledInput value={`${coordinates.lat},${coordinates.lng}`}></StyledInput>
            <button onClick={()=> addAntlers(coordinates)} >Add</button>
        </SmallContainer>
    )
}

export default Tab1;
const SmallContainer=styled.div`

display:flex;
flex-direction: column;
align-items: center;
padding-top:0px;
`
const StyledInput=styled.input`
width:250px;
`