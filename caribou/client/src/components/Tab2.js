import styled from "styled-components";
import {BiCurrentLocation} from "react-icons/bi";
import { useState } from "react";
const Tab2 =({coordinates,addRadar,zonedHumans})=>{
    const [data, setData]=useState({radius:''});

    return(
        <SmallContainer>
            <label>Radius</label><input type="number" onChange={(e)=>setData({...data,['radius']:e.target.value})} ></input>
            <label><BiCurrentLocation/>Click on Map to Get Coordinates</label>
            <StyledInput value={`${coordinates.lat},${coordinates.lng}`}></StyledInput>
            <StyledButton onClick={()=> addRadar(data)}>Search Area </StyledButton>
        
                <DetailsDiv>
                    <h4>Humans Detected in Zone</h4>
                    {zonedHumans&&zonedHumans.map((human)=>{
                            return<p>Human detected at {human.coordinates.lat} latitude and {human.coordinates.lng} longitude</p>
                    })}
                </DetailsDiv>
        </SmallContainer>
    )
}

export default Tab2;
const SmallContainer=styled.div`
display:flex;
flex-direction: column;
align-items: center;

height:600px;
`
const StyledButton=styled.button`
margin-top:20px;
`
const DetailsDiv=styled.div`
border-top:1px solid black;
overflow-y:scroll;
height:500px;
width:400px;
`
const StyledInput=styled.input`
width:250px;
`

