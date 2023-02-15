import styled from "styled-components";
import {BiCurrentLocation} from "react-icons/bi";
import { useState } from "react";
const Tab2 =({coordinates,addRadar,zonedHumans})=>{
    const [data, setData]=useState({radius:''});

    return(
        <SmallContainer>
            <InputDiv>
                <Title>Add Zone</Title><StyledInput placeholder="Radius (km)" type="number" onChange={(e)=>setData({...data,['radius']:e.target.value})} ></StyledInput>
                <label><BiCurrentLocation/>Click on Map to Get Coordinates</label>
                <StyledInput value={`${coordinates.lat},${coordinates.lng}`}></StyledInput>
                <StyledButton onClick={()=> addRadar(data)}>Search Area </StyledButton>
            </InputDiv>
            <DetailsDiv>
                <SubTitle>Humans Detected in Zone</SubTitle>
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
const InputDiv=styled.div`
border:1px solid black;
display:flex;
flex-direction: column;
justify-content: center;
align-items: center;
margin-top:10px;
margin-bottom:10px;
width:400px;
`
const StyledButton=styled.button`
font-size: 20px;
padding:10px;
border-radius: 50px;
border: none;
&:active{
    background-color: grey;
}
margin-top:10px;
margin-bottom: 10px;
`
const DetailsDiv=styled.div`
border:1px solid black;
overflow-y:scroll;
height:400px;
width:400px;
display: flex;
flex-direction: column;
align-items: center;
`
const StyledInput=styled.input`
width:250px;
`
const Title=styled.p`
font-size:30px;
margin-bottom:10px;
`
const SubTitle=styled.p`
text-decoration: underline;
`

