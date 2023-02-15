import { useState } from "react";
import styled from "styled-components";
import Tab1 from "./Tab1";
import Tab2 from "./Tab2";
import Tab3 from "./Tab3";

const CommandBox =({coordinates,addHumans,addAntlers,addRadar,zonedHumans,setzonedHumans})=>{
    const [taboption,setTabOption]=useState(1);

    //function toggles between the tabs
    const handleClick=(idx)=>{
        setTabOption(idx);
    }
    return(
        <div>
            <Container>
                <Tabs>
                    <StyledButton onClick={e=>handleClick(1)}>Signal Human</StyledButton>
                    <StyledButton onClick={e=>handleClick(2)}>Zone Search</StyledButton>
                    <StyledButton onClick={e=>handleClick(3)}>Caribou Request</StyledButton>
                </Tabs>
                <div>
                    {(taboption==1)&&<Tab1 coordinates={coordinates} addHumans={addHumans}/>}
                    {(taboption==2)&&<Tab2 coordinates={coordinates} addRadar={addRadar} zonedHumans={zonedHumans}/>}
                    {(taboption==3)&&<Tab3 coordinates={coordinates} addAntlers={addAntlers}/>}
                </div>
            </Container>
        </div>
    )
}
export default CommandBox;

const Container=styled.div`
background-color:lightgrey;
height:700px;
width:450px;
margin-right: 10px;


`
const Tabs=styled.div`
display:flex;
flex-direction:row;
justify-content: space-evenly;
border-bottom: 2px solid black;
background-color: black;

`
const StyledButton=styled.button`
font-size: 15px;
border: 0px ;
background-color: transparent;
&:hover{
    text-decoration:underline;
}
padding-top:20px;
padding-bottom:20px;
color: white;
`