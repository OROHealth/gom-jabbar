import styled from 'styled-components';

export const StyleAddOrder = styled.div`
.containeur{
    display: flex;
    flex-direction: column;
    text-align: center;
    margin-top: 5%;
    margin-left: 15%;
    background: lightgrey;
    height: 450px;
    width: 1000px;
    border-radius: 5px;
    position : relative;
}

h4{
    color: darkorange;
    font-family: cursive;
}

#form, #form1{
    display: flex;
    justify-content: center;
    margin-top: 8%;
    width: 600px;
}

#form1{
    height: 500px;
    width: 400px;
    margin-top: 0%;
    margin-left: 30%;
    justify-content: space-between;
}

.food{
    display: flex;
    justify-content: space-between;
}

.drink{
    display: flex;
    justify-content: space-between;
}

label{
    font-size: 18px;
    font-weight: bold;
    color: black;
    opacity: 0.7;
}

input{
    background: white;
    width: 270px;
}

textarea{
    background: white;
}

.option{
    width: 600px;
    display: flex;
    justify-content: space-between;
}

.option1{
    width: 270px;
    margin-left: 2.5%;
}

.option2{
    width: 270px;
    margin-right: 2.5%;
}

.button{
    background: darkorange;
    height: 30px;
    width: 70px;
}

#buttons{
    margin-top: 5%;
}

.container-fluide{
    border-radius: 5px;
    background: darkorange;
    position : absolute;
    bottom: 0;
    left: 0;
}

#buttonFlui{
    position : absolute;
    bottom: 0;
    left: 0;
    border-radius: 5px;
    padding: 20px;
    background: darkorange;
}

#buttonBill{
    position : absolute;
    bottom: 0;
    right: 0;
    border-radius: 5px;
    padding: 20px;
    background: darkorange;
}

.buttonTotalBill{
    display: flex;
    justify-content: center;
    margin-top: 20%;
    border-radius: 2px;
}

#buttonTotal{
    padding: 20px;
    background: darkorange;
}

.button:hover, #buttonFlui:hover,#buttonBill:hover, #buttonTotal:hover{
    opacity: 0.5;
    cursor: pointer;
}

`;