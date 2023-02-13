import styled from "styled-components";
import {BiCurrentLocation} from "react-icons/bi";
import { useState } from "react";
const Tab2 =({coordinates,addRadar,})=>{
    const [data, setData]=useState({radius:''});

    return(
        <SmallContainer>
            <label>Radius</label><input type="number" onChange={(e)=>setData({...data,['radius']:e.target.value})} ></input>
            <label><BiCurrentLocation/>Click on Map to Get Coordinates</label>
            <StyledInput value={`${coordinates.lat},${coordinates.lng}`}></StyledInput>
            <StyledButton onClick={()=>addRadar(data)}>Search Area </StyledButton>

                <DetailsDiv>
                    <h4>Humans Detected in Zone</h4>
                </DetailsDiv>
        </SmallContainer>
    )
}

export default Tab2;
const SmallContainer=styled.div`
display:flex;
flex-direction: column;
align-items: center;
`
const StyledButton=styled.button`
margin-top:20px;
`
const DetailsDiv=styled.div`
border-top:1px solid black;

`
const StyledInput=styled.input`
width:250px;
`

