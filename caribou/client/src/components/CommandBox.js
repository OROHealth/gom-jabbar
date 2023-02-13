import { useState } from "react";
import styled from "styled-components";
import Tab1 from "./Tab1";
import Tab2 from "./Tab2";
import Tab3 from "./Tab3";

const CommandBox =({coordinates,addHumans,addAntlers,addRadar,closeHumans})=>{
    const [taboption,setTabOption]=useState(1);

    const handleClick=(idx)=>{
        setTabOption(idx);
    }
    return(
        <div>
            <LiveFeed></LiveFeed>
            <Container>
                <Tabs>
                    <StyledButton onClick={e=>handleClick(1)}>Signal Human</StyledButton>
                    <StyledButton onClick={e=>handleClick(2)}>Zone Search</StyledButton>
                    <StyledButton onClick={e=>handleClick(3)}>Caribou Request</StyledButton>
                </Tabs>
                <div>
                    {(taboption==1)&&<Tab1 coordinates={coordinates} addHumans={addHumans}/>}
                    {(taboption==2)&&<Tab2 coordinates={coordinates} addRadar={addRadar} closeHumans={closeHumans}/>}
                    {(taboption==3)&&<Tab3 coordinates={coordinates} addAntlers={addAntlers}/>}
                </div>
            </Container>
        </div>
    )
}
export default CommandBox;

const LiveFeed=styled.div`
height:200px;
width:400px;
background-color: lightgray;
margin-right:50px;
`
const Container=styled.div`
background-color:grey;
height:500px;
width:400px;
margin-right: 50px;
`
const Tabs=styled.div`
display:flex;
flex-direction:row;
justify-content: space-evenly;
font-size: 12px;
`
const StyledInput=styled.input`
width:250px;
`
const StyledButton=styled.button`
border: 0px ;
background-color: grey;
`