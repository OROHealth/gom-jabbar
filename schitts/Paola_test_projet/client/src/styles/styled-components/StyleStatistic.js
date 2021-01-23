import styled from 'styled-components';

export const StyleStatistic = styled.div`

    .containeurFluid {
        display: flex;
        justify-content: center;
    }


    .myCanva{
        margin-top: 50px;
        width: 1000px;
    }

    .myButtons{
        margin: 50px;
        background: grey;
        height: 35px;
        width: 300px;
    }

    .myButtons:hover{
        opacity: 0.5;
        cursor: pointer;
    }

    h4{
        color: darkorange;
        font-family: cursive;
        text-align: center;
    }

    .myBody{
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        background: lightgrey;
        height: 500px;
        width: 1500px;
    }

    .myResults{
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        height: 400px;
        text-align: center;
        margin-top: 40px;
    }

    span{
        font-weight: bold;
        font-style: italic;
    }

    .myBut{
        background: darkorange;
        height: 40px;
        width: 340px;
    }

`;