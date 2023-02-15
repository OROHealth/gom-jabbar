import {BiCurrentLocation} from "react-icons/bi";
import styled from "styled-components";
import { useState } from "react";

const Tab1 =({coordinates,addHumans})=>{
    const [data, setData]=useState({eLevel:'',tLevel:''});
    
    return(
        <SmallContainer>
            <Title>Add a Human</Title>
            <StyledInput onChange={(e)=>setData({...data,['eLevel']:e.target.value})}placeholder="Level of Excitement" type='number'></StyledInput>
            <StyledInput onChange={(e)=>setData({...data,['tLevel']:e.target.value})}placeholder="Thrashing Level" type='number'></StyledInput>
            <label><BiCurrentLocation/>Click on Map to Get Coordinates</label>
            <StyledInput value={`${coordinates.lat},${coordinates.lng}`}></StyledInput>
            <StyledButton onClick={()=> addHumans(data)} >Add Human</StyledButton>
        </SmallContainer>
    )
}

export default Tab1;
const SmallContainer=styled.div`
display:flex;
flex-direction: column;
align-items: center;
justify-content: center;
height:300px;
border: 1px solid black;
margin-top: 100px;
margin-left:30px;
margin-right:30px;
`
const StyledInput=styled.input`
width:250px;
margin-bottom: 15px;
`
const StyledButton=styled.button`
font-size: 20px;
padding:10px;
border-radius: 50px;
border: none;
&:active{
    background-color: grey;
}
`
const Title=styled.p`
font-size:30px;
`
