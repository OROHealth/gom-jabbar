import {BiCurrentLocation} from "react-icons/bi";
import styled from "styled-components";
import { useState } from "react";

const Tab1 =({coordinates,addHumans})=>{
    const result=coordinates;
    const [data, setData]=useState({eLevel:'',tLevel:''});
    return(
        <SmallContainer>
            <StyledInput onChange={(e)=>setData({...data,['eLevel']:e.target.value})}placeholder="Level of Excitement" type='number'></StyledInput>
            <StyledInput onChange={(e)=>setData({...data,['tLevel']:e.target.value})}placeholder="Thrashing Level" type='number'></StyledInput>
            <label><BiCurrentLocation/>Click on Map to Get Coordinates</label>
            <StyledInput value={`${coordinates.lat},${coordinates.lng}`}></StyledInput>
            <button onClick={()=> addHumans(data)} >Add</button>
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
`
const StyledInput=styled.input`
width:250px;
`