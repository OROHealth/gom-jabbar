import { useState } from "react";
import styled from "styled-components";
import Tab1 from "./Tab1";
import Tab2 from "./Tab2";
import Tab3 from "./Tab3";

const CommandBox =({coordinates,addHumans,addAntlers,addRadar,zonedHumans,setzonedHumans})=>{
    const [taboption,setTabOption]=useState(1);

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
                    {(taboption==2)&&<Tab2 coordinates={coordinates} addRadar={addRadar} zonedHumans={zonedHumans} setzonedHumans={setzonedHumans}/>}
                    {(taboption==3)&&<Tab3 coordinates={coordinates} addAntlers={addAntlers}/>}
                </div>
            </Container>
        </div>
    )
}
export default CommandBox;

// const LiveFeed=styled.div`
// height:200px;
// width:400px;
// background-color: lightgray;
// margin-right:50px;
// `
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

`
const StyledDiv=styled.div`

`
const StyledButton=styled.button`
font-size: 15px;
border: 0px ;
background-color: lightgrey;
&:hover{
    text-decoration:underline;
}
padding-top:20px;
padding-bottom:20px;
`